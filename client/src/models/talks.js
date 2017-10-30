/* @flow */
import {Record} from 'immutable';
import store from 'store';
import MediaStreamRecorder from 'msr';

const TalksState = Record({
  mediaRecorder: undefined,
});

class Talks extends TalksState {
  recordStart(state, action) {
    const newState = state.update('mediaRecorder', async () => {
      const {navigator} = window;

      const dispatchUserMedia = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const onMediaSuccess = (stream: ?any) => {
        const mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.stream = stream;
        mediaRecorder.mimeType = 'audio/wav';
        const storeBuffer =
          store.get('recordBuffer') !== undefined
            ? store.get('recordBuffer')
            : [];
        mediaRecorder.ondataavailable = blob => {
          // store dataavailable data
          storeBuffer.push(blob);
          console.log(storeBuffer);
          if (blob.size > 0) {
            store.set('recordBuffer', storeBuffer);
          }
        };

        mediaRecorder.start();
        return mediaRecorder;
      };

      return onMediaSuccess(await dispatchUserMedia);
    });
    return newState;
  }

  recordSave(state, payload) {
    const newState = state.update('mediaRecorder', async () => {
      const {document, URL} = window;

      const mediaDispatch = await state.mediaRecorder;
      mediaDispatch.ondataavailable = blob => {
        // store dataavailable data
        const storedRecord: any = store.get('recordBuffer');
        // ConcatenateBlobs(storedRecord, 'audio/wav', resultingBlob => {
        //   mediaDispatch.save(resultingBlob, 'record.wav');
        // });
        const url = URL.createObjectURL(
          new Blob(storedRecord, {type: 'audio/wav'}),
        );
        const link = document.createElement(`a`);
        link.href = url;
        link.download = 'record.wav';
        link.click();
        // mediaDispatch.save(new Blob(storedRecord), 'record.wav');
        mediaDispatch.stop();
        mediaDispatch.stream.stop();
        store.clearAll();
      };

      return undefined;
    });
    return newState;
  }

  dammy(state, payload) {
    const newState = state.update('recordBuffer', () => state.recordBuffer);
    return newState;
  }
}

export default Talks;
