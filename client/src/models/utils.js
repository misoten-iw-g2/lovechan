/* @flow */

const appendBuffer = (buffer1: ArrayBuffer, buffer2: ArrayBuffer) => {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

const ArraytoBlob = (mime: any, array: any) => {
  const arr = new Uint8Array(array.length);
  for (let i = 0; i < array.length; i += 1) {
    arr[i] = array[i];
  }

  const blob = new Blob([arr], {type: mime});
  return blob;
};

const exportWAV = (audioData: any, sampleRate: any) => {
  const encodeWAV = samples => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const writeString = (offset: any, string: any) => {
      for (let i = 0; i < string.length; i += 1) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    const floatTo16BitPCM = (output, offset, input) => {
      let countOffset = offset;
      for (let i = 0; i < input.length; i += 1, countOffset += 2) {
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

export {appendBuffer, ArraytoBlob, exportWAV};
