/* @flow */
import {Stack, isCollection} from 'immutable';
import MediaStreamRecorder from 'msr';
import store from 'store';

export type Window = {
  navigator: {},
};

export type Stream = ?any;

export const audioStream = () => {
  const onMediaSuccess = (stream: ?any) => {
    const mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'audio/wav';
    mediaRecorder.start();
    const storedRecordBuffer = store.get('recordBuffer');
    mediaRecorder.addEventListener('dataavailable', e => {
      // store
      if (!storedRecordBuffer) {
        const recordStack = new Stack();
        recordStack.push(e.data);
        store.set('recordBuffer', recordStack);
      } else if (isCollection(storedRecordBuffer)) {
        storedRecordBuffer.push(e.data);
        store.set('recordBuffer', storedRecordBuffer);
      }
    });
    // mediaRecorder.save(blob, 'record.wav');
    // mediaRecorder.stop();
    // mediaRecorder.stream.stop();
  };
  const onMediaError = e => {
    console.error('media error', e);
  };

  const {navigator} = window;
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false,
    })
    .then(onMediaSuccess)
    .catch(onMediaError);
};

export const dammyMedia = () => 'dammyMedia';
