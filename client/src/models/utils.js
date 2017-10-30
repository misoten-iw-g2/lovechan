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

export {appendBuffer, ArraytoBlob};
