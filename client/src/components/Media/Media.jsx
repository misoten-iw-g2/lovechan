/* @flow */
import * as React from 'react';

// import HeaderGrid from '../Common/HeaderGrid';
// import FirstGrid from './FirstGrid';
// import SecondGrid from './SecondGrid';
import _words from '../../config/words';

export type Props = {
  media: () => void,
};

const Media = (props: Props) => {
  console.log(props);
  return <div id="c_media">a</div>;
};

export default Media;
