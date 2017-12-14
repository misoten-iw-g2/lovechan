/* @flow */
import * as React from 'react';
import {Header} from 'semantic-ui-react';
import classNames from 'classnames';
import Grid from 'react-css-grid';
import {MikeOff, MikeOn} from '../../Organisms';

const {Fragment} = React;

type Props = {
  recordApi: () => void,
  saveApi: () => void,
  choiceTitle: string,
  choices: [],
};

class ChatComponent extends React.Component<Props> {
  componentDidMount() {}

  mapChatDataRender = () => {
    const {choices} = this.props;
    return choices.length !== 0 ? (
      choices.map((item, index) => {
        const mapChatKey = `${item}${index}`;
        return (
          <Fragment key={mapChatKey}>
            <div className={classNames('app_btn')}>
              <p>{item}</p>
            </div>
          </Fragment>
        );
      })
    ) : (
      <Fragment />
    );
  };

  render() {
    const {recordApi, saveApi, choiceTitle} = this.props;
    return (
      <div id="chat">
        {/**
         * ヘッダー
         */}
        <Grid width="100%" gap={0} className={classNames('grid-header')}>
          <Header as="h1" className={classNames('app_header')}>
            {choiceTitle}
          </Header>
        </Grid>
        {/**
         * メインコンテンツ
         */}
        <Grid
          width="100%"
          gap="2vw"
          className={classNames('grid-btn')}
          onClick={() => saveApi()}
        >
          {/* TODO: チャットデータ回す */}
          {this.mapChatDataRender()}
        </Grid>
        {/**
         * マイクコンテンツ
         */}
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
  return ChatComponent;
}

export default Chat();
