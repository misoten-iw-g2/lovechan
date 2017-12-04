/* @flow */
import * as React from 'react';
import {Header} from 'semantic-ui-react';
import classNames from 'classnames';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import {MikeOff, MikeOn} from '../../Organisms';

type Props = {
  recordApi: () => void,
  saveApi: () => void,
  choiceTitle: string,
  talks: [],
};

class ChatComponent extends React.Component<Props> {
  componentDidMount() {}

  render() {
    const {recordApi, saveApi, choiceTitle, talks} = this.props;
    return (
      <div id="two_choice">
        <Grid width="100%" gap={0} className={classNames('grid-header')}>
          <Header as="h1" className={classNames('app_header')}>
            {choiceTitle}
          </Header>
        </Grid>

        <Grid
          width="20vw"
          gap="10vw"
          className={classNames('grid-btn')}
          onClick={() => saveApi()}
        >
          <div className={classNames('app_btn', 'app_btn-voice_choiced')}>
            <p>{choice1}</p>
          </div>
          <div className={classNames('app_btn')}>
            <p>{choice2}</p>
          </div>
        </Grid>

        <Grid
          width="100%"
          gap={0}
          className={classNames('grid-mike')}
          onClick={() => recordApi()}
        >
          <MikeOff
            className={classNames({app_mike: true, visible: true, hide: false})}
            fill="#fff"
          />
          <MikeOn
            className={classNames({app_mike: true, visible: false, hide: true})}
            fill="#fff"
          />
        </Grid>
      </div>
    );
  }
}

function Chat() {
  return withRouter(ChatComponent);
}

export default Chat();
