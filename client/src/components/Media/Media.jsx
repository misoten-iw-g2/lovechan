/* @flow */
import * as React from 'react';

import _words from '../../config/words';

export type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

class MediaComponent extends React.PureComponent<Props> {
  render() {
    return (
      <div id="c_media">
        <div>recorddddddddd</div>
        <div>
          <button onClick={() => this.props.recordStart()}>うぇいする</button>
          <button onClick={() => this.props.recordSave()}>
            うぇいだうんろーど
          </button>
        </div>
      </div>
    );
  }
}

function Media() {
  return MediaComponent;
}

export default Media();
