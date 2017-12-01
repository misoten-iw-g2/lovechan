/* @flow */
import {createActions} from 'redux-actions';
import {Record} from 'immutable';
import * as myself from './talks';
import {postWAV} from './apis/postWAV';

const SuccessResponseRecord = Record({
  next_page: '',
  user_voice_text: '',
});

const FailedResponseRecord = Record({
  id: '',
  code: '',
  bad_request: '',
  status: '',
  detail: '',
});

export const talksActions = createActions({
  talks: {
    recordAudio: null,
    saveAudio: null,
    routing: async (apiUrl, blob) => {
      try {
        const postWAVResponse = await postWAV(apiUrl, blob);
        const responseJSON = await postWAVResponse.json();

        if (!postWAVResponse.ok) {
          const failedDatasRecord = new FailedResponseRecord(responseJSON);
          throw Error(failedDatasRecord.get('detail'));
        }
        const successResponseRecord = new SuccessResponseRecord(responseJSON);
        const payload = await successResponseRecord.toJSON();

        return payload;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
});

export default Object.assign(talksActions, myself);
