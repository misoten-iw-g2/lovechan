/* @flow */
import {createActions} from 'redux-actions';
import {apiUrls} from '../config/url';
import {RecordAudio} from '../utils/RecordAudio';

export default createActions({
  talks: {
    recordStart: undefined,
    recordSave: undefined,
    dammy: async () => {
      const fetchDatas = await fetch(
        'https://withonoware.co.jp/wp-json/wp/v2/news',
      );
      const datasJson = await fetchDatas.json();
      return datasJson;
    },
    rootingFromRoot: async (
      apiUrl: string,
      context: any,
      storeAudio: any,
      stream: any,
      bufferSize: any,
    ) => {
      const fetchDatas = RecordAudio.postWAV(
        apiUrl,
        context,
        storeAudio,
        stream,
        bufferSize,
      );
      // return datasJson;
    },
  },
});
