/* @flow */
import {createActions} from 'redux-actions';
import {Record, type RecordFactory, type RecordOf} from 'immutable';
import {postWAV} from './apis/postWAV';

type Response = {
  id?: string,
  answer?: string,
  answer_type?: string,
  choices?: [],
  is_clear?: boolean,
  next_step?: boolean,
  question?: string,
  story_pattern?: string,
  url?: string,
  next_page?: string,
  user_voice_text?: string,
  is_finish?: boolean,
  question?: string,
};

type Failed = {
  id: string,
  code: string,
  bad_request: string,
  status: string,
  detail: string,
};

const SuccessResponseRecord: RecordFactory<Response> = Record({
  answer: '',
  choices: [],
  is_clear: false,
  next_step: false,
  question: '',
  story_pattern: '',
  url: '',
  next_page: '',
  user_voice_text: '',
  is_finish: false,
});

const FailedResponseRecord: RecordFactory<Failed> = Record({
  id: '',
  code: '',
  bad_request: '',
  status: '',
  detail: '',
});

const ChatRecord: RecordFactory<Response> = Record({
  answer_type: '',
  choices: [],
  id: '',
  question: '',
});

export default createActions({
  talks: {
    recordAudio: null,
    saveAudio: null,
    routing: async (apiUrl, blob) => {
      try {
        const response = await postWAV(apiUrl, blob);
        const responseJson = await response.json();

        if (!response.ok) {
          const failedRecord = new FailedResponseRecord(responseJson);
          throw Error(failedRecord.get('detail'));
        }

        const responseRecord: RecordOf<Response> = new SuccessResponseRecord(
          responseJson
        );
        const payload = await responseRecord.toJS();

        return payload;
      } catch (e) {
        throw e;
      }
    },
    chatRouting: async apiUrl => {
      try {
        const response = await fetch(apiUrl);
        const responseJson = await response.json();

        if (!response.ok) {
          const failedRecord = new FailedResponseRecord(responseJson);
          throw Error(failedRecord.get('detail'));
        }

        const responseRecord: RecordOf<Response> = new ChatRecord(responseJson);
        const payload = await responseRecord.toJS();

        return payload;
      } catch (error) {
        throw error;
      }
    },
  },
});
