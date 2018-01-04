/* @flow */
import {
  Record,
  Stack,
  setIn,
  fromJS,
  type RecordFactory,
  type RecordOf,
} from 'immutable';
import encodeWAV from '../apis/encodeWAV';

type Talks = {
  webrtc: any,
  wav: any,
  routingData: any,
  chatData: any,
  chatRoutingData: any,
  recording: boolean,
  audioContext: any,
  requestDevice: any,
  audioStream: any,
  recBuffer: [],
  recLength: number,
  mergedBuffers: any,
};

const TalksRecord: RecordFactory<Talks> = Record({
  webrtc: null,
  wav: null,
  routingData: null,
  chatData: null,
  chatRoutingData: null,
  recording: false,
  audioContext: null,
  requestDevice: null,
  audioStream: null,
  recBuffer: [],
  recLength: 0,
  mergedBuffers: null,
});

export default class TalksState extends TalksRecord {
  recordAudio(state: RecordOf<Talks>, action: {}) {
    return state.withMutations(async mutableState => {
      // only set method
      /**
       * Set recording flag
       */
      mutableState.set('recording', true);

      /**
       * Set audioContext then null
       */
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const withAudioContext =
        mutableState.get('audioContext') === null
          ? new AudioContext()
          : mutableState.get('audioContext');
      mutableState.set('audioContext', withAudioContext);

      /**
       * Request MediaDevices
       */
      const requestDevice = window.navigator.mediaDevices
        .getUserMedia({audio: true})
        .then(stream => {
          return stream;
        });
      mutableState.set('audioStream', requestDevice);

      /**
       * Create Node
       */
      const node = mutableState
        .get('audioContext')
        .createMediaStreamSource(await mutableState.get('audioStream'))
        .context.createScriptProcessor(4096, 1, 1);

      node.connect(mutableState.get('audioContext').destination);

      /**
       * Audio Record
       */
      node.onaudioprocess = audioProcessingEvent => {
        if (!mutableState.get('recording')) {
          // if not recoding, exit onaudioprocess
          return;
        }

        mutableState.set(
          'recBuffer',
          mutableState
            .get('recBuffer')
            .push(audioProcessingEvent.inputBuffer.getChannelData(0))
        );

        mutableState.set(
          'recLength',
          mutableState.get('recLength') +
            audioProcessingEvent.inputBuffer.getChannelData(0).length
        );
      };
    });
  }

  saveAudio(state: RecordOf<Talks>, action: {}) {
    return state.withMutations(mutableState => {
      // only set method

      /**
       * Merge Buffers
       */
      // let result = new Float32Array(mutableState.get('recLength'));
      // let offset = 0;
      // for (let i = 0; i < mutableState.get('recBuffer').length; i++) {
      //   result.set(mutableState.get('recBuffer')[i], offset);
      //   offset += mutableState.get('recBuffer')[i].length;
      // }

      let samples = new Float32Array(mutableState.get('recLength'));
      let offset = 0;
      for (let i = 0; i < mutableState.get('recBuffer').length; i += 1) {
        for (let j = 0; j < mutableState.get('recBuffer')[i].length; j += 1) {
          samples[offset] = mutableState.get('recBuffer')[i][j];
          offset += 1;
        }
      }

      mutableState.set('mergedBuffers', samples);

      /**
       * Set recording flag
       */
      mutableState.set('recording', false);

      /**
       * Save wav
       */
      const blobBuffer = encodeWAV(mutableState.get('mergedBuffers'));
      mutableState.set('wav', new Blob([blobBuffer], {type: 'audio/wav'}));
    });
  }

  routing(
    state: RecordOf<Talks>,
    action: {payload: {user_voice_text: string, answer: string}}
  ) {
    /**
     * clearing routingData
     */
    state.delete('routingData');

    /**
     * Setter Data for Components
     */
    state.set('routingData', action.payload);

    /**
     * Setter ChatData for Chat Component
     */
    state.update('chatData', chatData => {
      const chatStack = Stack();
      return chatStack
        .push(
          ...chatData,
          action.payload.user_voice_text,
          action.payload.answer
        )
        .toArray();
    });

    return state;
  }

  chatRouting(state: RecordOf<Talks>, action: {payload: {question: string}}) {
    /**
     * clearing chatData
     */
    // state.delete('chatData');
    state.delete('wav');
    state.delete('routingData');
    state.set('chatRoutingData', action.payload);
    const chatStack = Stack(state.chatData);
    state.set('chatData', chatStack.push(action.payload.question).toArray());
  }
}
