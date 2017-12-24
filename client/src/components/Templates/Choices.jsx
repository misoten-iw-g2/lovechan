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
  getChoicesTitle: () => string,
  getChoices: () => string,
  getIsClear: () => boolean,
};

function Choices(props: Props) {
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
    getChoices,
    getIsClear,
    getChoicesTitle,
  } = props;

  const organizedChoicesTitle =
    choiceTitle.length !== 0 ? choiceTitle : getChoicesTitle();
  const organizedChoices: any = choices.length !== 0 ? choices : getChoices();
  const organizedIsClear = isClear || getIsClear();

  const mapChoicesRender = !organizedIsClear ? (
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
    await routing(apiUrl, talks.wav);
  };

  return (
    <div className="choices">
      <Grid width="100%" gap={0} className={classNames('grid_header')}>
        <Header as="h1" className={classNames('app_header')}>
          <span>{organizedChoicesTitle}</span>
        </Header>
      </Grid>

      {organizedChoices.length < 3 ? (
        <Grid
          width="100%"
          gap={0}
          className={classNames('grid_btn_two')}
          onClick={() => runApi()}
        >
          {mapChoicesRender}
        </Grid>
      ) : (
        <Grid width={400} gap={60} className={classNames('grid_btn_more')}>
          {mapChoicesRender}
        </Grid>
      )}

      <Grid
        width="100%"
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

export default Choices;
