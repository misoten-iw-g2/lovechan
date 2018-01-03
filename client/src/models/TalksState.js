/* @flow */
import {Record, Stack, type RecordFactory, type RecordOf} from 'immutable';

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
    /**
     * record flag TRUE
     */
    state.set('recording', true);

    if (typeof state.get('audioContext') === 'undefined') {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      state.set('audioContext', new AudioContext());
    }

    state.update('requestDevice', () => {
      return window.navigator.mediaDevices
        .getUserMedia({audio: true})
        .then(stream => {
          state.set('audioStream', stream);
        });
    });

    const node = state
      .get('audioContext')
      .createMediaStreamSource(state.get('audioStream'))
      .context.createScriptProcessor(4096, 1, 1);
    node.connect(state.get('audioContext'));

    /**
     * Audio Record
     */
    let recBuffer = [];
    let recLength = 0;

    node.onaudioprocess = audioProcessingEvent => {
      if (!state.get('recording')) {
        // if not recoding, exit onaudioprocess
        return;
      }

      recBuffer.push(audioProcessingEvent.inputBuffer.getChannelData(0));
      recLength += audioProcessingEvent.inputBuffer.getChannelData(0).length;
    };

    state.update('mergedBuffers', mergeBuffers => {
      const result = new Float32Array(recLength);
      let offset = 0;
      for (let i = 0; i < recBuffer.length; i++) {
        result.set(recBuffer[i], offset);
        offset += recBuffer[i].length;
      }
      return result;
    });

    return state;
  }

  saveAudio(state: RecordOf<Talks>, action: {}) {
    /**
     * record flag FALSE
     */
    state.set('recording', false);

    const floatTo16BitPCM = (output, offset, input) => {
      for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    };
    const writeString = (view, offset, string) => {
      for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    const encodeWAV = samples => {
      /* eslint-disable no-mixed-operators */
      const recordSampleRate = 44100;
      const buffer = new ArrayBuffer(44 + samples.length * 2);
      const view = new DataView(buffer);

      writeString(view, 0, 'RIFF');
      view.setUint32(4, 32 + samples.length * 2, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, recordSampleRate, true);
      view.setUint32(28, recordSampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeString(view, 36, 'data');
      view.setUint32(40, samples.length * 2, true);
      floatTo16BitPCM(view, 44, samples);

      return view;
      /* eslint-enable no-mixed-operators */
    };

    const newWav = encodeWAV(state.get('mergedBuffers'));
    state.set('wav', newWav);

    return state;
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
