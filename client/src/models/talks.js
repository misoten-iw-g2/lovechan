/* @flow */
import {Record} from 'immutable';
import {apiUrls} from '../config/url';

const TalksState = Record({
  webrtc: undefined,
});

class Talks extends TalksState {
  recordStart(state: any, _action: any) {
    const newState = state.update('webrtc', async () => {
      const {navigator, AudioContext} = window;

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
    });
    return newState;
  }

  recordSave(state: any, _action: any) {
    const newState = state.update('webrtc', async () => {
      const {URL, document} = window;
      const {context, storeAudio, stream, bufferSize} = await state.webrtc;
      const audioBuffer = () => {
        const buffer = context.createBuffer(
          1,
          storeAudio.length * bufferSize,
          context.sampleRate,
        );
        const channel = buffer.getChannelData(0);
        for (let i = 0; i < storeAudio.length; i += 1) {
          for (let j = 0; j < bufferSize; j += 1) {
            channel[i * bufferSize + j] = storeAudio[i][j];
          }
        }
        return buffer;
      };

      const mainAudioTrack = stream.getAudioTracks()[0];
      mainAudioTrack.stop();
      const src = context.createBufferSource();
      src.buffer = audioBuffer();
      src.connect(context.destination);
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
      const blob = exportWAV(storeAudio, context.sampleRate);
      const url = URL.createObjectURL(blob);
      const api = async () => {
        const form: any = new FormData();
        form.append('uploadfile', blob, 'out.wav');
        const postSpeech = await fetch(apiUrls.post_speach, {
          method: 'POST',
          headers: {},
          body: form
        });
        const responseData = await postSpeech;
        console.log(responseData);
      }
      api();
      // const link = document.createElement(`a`);
      // link.href = url;
      // link.download = 'output.wav';
      // link.textContent = 'download';
      // link.click();
      context.close();
    });
    return newState;
  }

  dammy(state: any, _action: any) {
    const newState = state.update('recordBuffer', () => state.recordBuffer);
    return newState;
  }
}

export default Talks;
