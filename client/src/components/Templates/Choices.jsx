/* @flow */
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
    recording: boolean,
  },
};

function Choices(props: Props) {
  const {
    choiceTitle,
    choices,
    isClear,
    recordAudio,
    saveAudio,
    routing,
    apiUrl,
    talks,
  } = props;

  const mapChoicesRender = !isClear ? (
    choices.map(item => (
      <React.Fragment key={uuidv4()}>
        <p className={classNames('btn_item')}>{item}</p>
      </React.Fragment>
    ))
  ) : (
    <React.Fragment />
  );

  const runApi = async () => {
    await console.log('before');
    await recordAudio();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await console.log('after');
    await saveAudio();

    routing(apiUrl, talks.wav);
  };

  return (
    <div
      className="choices"
      onClick={() => runApi()}
      onKeyPress={() => {}}
      onKeyDown={() => {}}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
    >
      <Grid width="100%" gap={0} className={classNames('grid_header')}>
        <Header as="h1" className={classNames('app_header')}>
          <span>{choiceTitle}</span>
        </Header>
      </Grid>

      {choices.length < 3 ? (
        <Grid width="100%" gap={0} className={classNames('grid_btn_two')}>
          {mapChoicesRender}
        </Grid>
      ) : (
        <Grid width={400} gap={60} className={classNames('grid_btn_more')}>
          {mapChoicesRender}
        </Grid>
      )}

      <Grid width="100%" gap={0} className={classNames('grid_mike')}>
        <div
          className={classNames({
            app_mike: true,
            visible: !talks.recording,
            hide: talks.recording,
          })}
        >
          <MikeOff
            className={classNames({
              app_mike: true,
            })}
            fill="#fff"
          />
        </div>
        <div
          className={classNames({
            app_mike: true,
            visible: talks.recording,
            hide: !talks.recording,
          })}
        >
          <MikeOn
            className={classNames({
              app_mike: true,
            })}
          />
        </div>
      </Grid>
    </div>
  );
}

export default Choices;
