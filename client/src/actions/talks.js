/* @flow */
import {createActions} from 'redux-actions';
import * as myself from './talks';
import {postWAV} from './apis/postWAV';

export const talksActions = createActions({
  talks: {
    recordAudio: null,
    saveAudio: null,
    routing: async (apiUrl, blob) => {
      const responseDatas = await postWAV(apiUrl, blob);
      console.log(responseDatas);
    },
  },
});

export default Object.assign(talksActions, myself);
