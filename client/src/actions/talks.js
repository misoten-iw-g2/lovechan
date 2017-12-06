/* @flow */
import {createActions} from 'redux-actions';
import {Record} from 'immutable';
import {postWAV} from './apis/postWAV';

const SuccessResponseRecord = Record({
  answer: '',
  choices: [],
  is_clear: null,
  next_step: null,
  question: '',
  story_pattern: '',
  url: '',
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

export default createActions({
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
        const payload = await successResponseRecord.toJS();

        return payload;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
});
