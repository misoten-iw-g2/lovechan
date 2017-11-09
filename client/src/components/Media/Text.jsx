/* @flow */
import * as React from 'react';

import _words from '../../config/words';

export type Props = {
  dammy: () => void
};

class Media extends React.PureComponent<Props> {
  render() {
    return (
      <div id="c_media">
        <div>工事中</div>
        <div>
          <button onClick={() => this.props.dammy()}>うぇいする</button>
        </div>
      </div>
    );
  }
}

export default Media;
