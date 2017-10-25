/* @flow */
import {createActions} from 'redux-actions';
import {media, dammy} from './apis/talks';

export default createActions({
  talks: {
    media: async () => {
      await media();
      return {media: 'media dispatch'};
    },

    dammy: async () => {
      await dammy();
      return {dammy: 'dammy dispatch'};
    },
  },
});
