// @flow
import * as React from 'react';
import uuidv4 from 'uuid/v4';
import {Header} from 'semantic-ui-react';
import Grid from 'react-css-grid';
import classNames from 'classnames';
import {MikeOff, MikeOn} from '../Organisms';

type Props = {
  choiceTitle: string,
  choices: [],
  isClear: boolean,
  recording: boolean,
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  apiUrl: string,
  talks: {
    wav: any,
  },
};

function Chat(props: Props) {
  window.navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(stream => {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    });

  const {
    choiceTitle,
    choices,
    isClear,
    recording,
    recordAudio,
    saveAudio,
    routing,
    apiUrl,
    talks,
    getApiUrl,
    getChoices,
  } = props;

  const organizedChoices = choices || getChoices();

  const mapChatDataRender =
    organizedChoices.length !== 0 ? (
      organizedChoices.map(item => (
        <React.Fragment key={uuidv4()}>
          <p className={classNames('btn_item')}>{item}</p>
        </React.Fragment>
      ))
    ) : (
      <React.Fragment />
    );

  const runApi = async () => {
    await saveAudio();
    await routing(apiUrl || getApiUrl(), talks.wav);
  };

  return (
    <div className="chat">
      <Grid width="100%" gap={0} className={classNames('grid_header')}>
        <Header as="h1" className={classNames('app_header')}>
          {choiceTitle}
        </Header>
      </Grid>

      <Grid
        width="100%"
        gap={0}
        className={classNames('grid_content')}
        onClick={() => runApi()}
      >
        {mapChatDataRender}
      </Grid>

      <Grid
        width={0}
        gap={0}
        className={classNames('grid_mike')}
        onClick={() => recordAudio()}
      >
        <MikeOff
          className={classNames({
            app_mike: true,
            visible: !recording,
            hide: recording,
          })}
          fill="#fff"
        />
        <MikeOn
          className={classNames({
            app_mike: true,
            visible: recording,
            hide: !recording,
          })}
          fill="#fff"
        />
      </Grid>
    </div>
  );
}

export default Chat;
