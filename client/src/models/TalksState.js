/* @flow */
import {Record, Stack} from 'immutable';

const TalksRecord = Record({
  webrtc: null,
  wav: null,
  routingDatas: [],
  chatDatas: [],
  chatRoutingDatas: [],
  chatData: [],
  recording: false,
});

export class TalksState extends TalksRecord {
  recordAudio(state: any, _action: any) {
    const newState = state.set('recording', true).update('webrtc', async () => {
      const {navigator, AudioContext} = window;

      if (state.webrtc !== null) {
        const subscriptionMedia = navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        const onMedia = stream => {
          const bufferSize = 4096;
          const context = new AudioContext();
          const source = context.createMediaStreamSource(stream);
          const processor = context.createScriptProcessor(bufferSize, 1, 1);

          source.connect(processor);
          processor.connect(context.destination);

          const storeAudio = [];

          processor.onaudioprocess = evt => {
            const channel = evt.inputBuffer.getChannelData(0);
            const buffer = new Float32Array(bufferSize);
            for (let i = 0; i < bufferSize; i += 1) {
              buffer[i] = channel[i];
            }
            storeAudio.push(buffer);
          };

          const result = new Promise(resolve => {
            resolve({context, storeAudio, stream, bufferSize});
          });
          return result;
        };

        return onMedia(await subscriptionMedia);
      }
      return state.webrtc;
    });
    return newState;
  }

  saveAudio(state: any, _action: any) {
    const newState = state.set('recording', false).update('wav', async () => {
      const {context, storeAudio, stream, bufferSize} = await state.webrtc;

      stream.getTracks().forEach(track => track.stop());

      const audioBuffer = () => {
        const buffer = context.createBuffer(
          1,
          storeAudio.length * bufferSize,
          context.sampleRate
        );
        const channel = buffer.getChannelData(0);
        for (let i = 0; i < storeAudio.length; i += 1) {
          for (let j = 0; j < bufferSize; j += 1) {
            channel[i * bufferSize + j] = storeAudio[i][j];
          }
        }
        return buffer;
      };

      if (!context.state === 'closed') {
        const src = context.createBufferSource();
        src.buffer = audioBuffer();
        src.connect(context.destination);
      }

      // CAUTION
      const exportWAV = (audioData, sampleRate) => {
        const encodeWAV = samples => {
          const buffer = new ArrayBuffer(44 + samples.length * 2);
          const view = new DataView(buffer);
          const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i += 1) {
              view.setUint8(offset + i, string.charCodeAt(i));
            }
          };
          const floatTo16BitPCM = (output, offset, input) => {
            for (let i = 0; i < input.length; i += 1, offset += 2) {
              const s = Math.max(-1, Math.min(1, input[i]));
              output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
            }
          };
          writeString(0, 'RIFF'); // RIFFヘッダ
          view.setUint32(4, 32 + samples.length * 2, true); // これ以降のファイルサイズ
          writeString(8, 'WAVE'); // WAVEヘッダ
          writeString(12, 'fmt '); // fmtチャンク
          view.setUint32(16, 16, true); // fmtチャンクのバイト数
          view.setUint16(20, 1, true); // フォーマットID
          view.setUint16(22, 1, true); // チャンネル数
          view.setUint32(24, sampleRate, true); // サンプリングレート
          view.setUint32(28, sampleRate * 2, true); // データ速度
          view.setUint16(32, 2, true); // ブロックサイズ
          view.setUint16(34, 16, true); // サンプルあたりのビット数
          writeString(36, 'data'); // dataチャンク
          view.setUint32(40, samples.length * 2, true); // 波形データのバイト数
          floatTo16BitPCM(view, 44, samples); // 波形データ
          return view;
        };
        const mergeBuffers = () => {
          let sampleLength = 0;
          for (let i = 0; i < audioData.length; i += 1) {
            sampleLength += audioData[i].length;
          }
          const samples = new Float32Array(sampleLength);
          let sampleIdx = 0;
          for (let i = 0; i < audioData.length; i += 1) {
            for (let j = 0; j < audioData[i].length; j += 1) {
              samples[sampleIdx] = audioData[i][j];
              sampleIdx += 1;
            }
          }
          return samples;
        };
        const dataview = encodeWAV(mergeBuffers());
        const audioBlob = new Blob([dataview], {type: 'audio/wav'});
        return audioBlob;
      };
      // CAUTION

      if (!context.state === 'closed') {
        const result = context.close().then(() => {
          const blob = exportWAV(storeAudio, context.sampleRate);
          return blob;
        });
        return result;
      }
      const blob = exportWAV(storeAudio, context.sampleRate);
      return blob;
    });
    return newState;
  }

  routing(state: any, action: any) {
    const chatDataStack = Stack();
    const newState = state
      .delete('routingDatas')

      .set('routingDatas', action.payload)
      .set(
        'chatData',
        chatDataStack
          .push(
            ...state.chatData,
            action.payload.user_voice_text,
            action.payload.answer
          )
          .toArray()
      );
    return newState;
  }

  chatRouting(state: any, action: any) {
    const chatDataStack = Stack(state.chatData);

    const newState = state.delete('chatData').withMutations(map => {
      map
        .delete('wav')
        .delete('routingDatas')
        .set('chatRoutingDatas', action.payload)
        // questionとanswerをpushする。
        .set('chatData', chatDataStack.push(action.payload.question).toArray());
    });

    return newState;
  }
}

export default TalksState;
