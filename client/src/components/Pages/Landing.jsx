/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {TwoChoice} from '../Templates';
import {url} from '../../config';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {wav: any},
  history: {},
  location: {},
  match: {},
};

function LandingComponent(props: Props) {
  const handleClick = async action => {
    switch (action) {
      case 'RECORD':
        await props.recordAudio();
        break;
      case 'SAVE':
        await props.saveAudio();
        break;
      default:
        break;
    }
  };

  const fetchRouting = async () => {
    const propWAV = props.talks.wav;
    if (propWAV !== null) {
      await props.routing(url.apis.root, propWAV);
    }
  };

  return (
    <div id="landing">
      <Grid width="100%" gap={0} onClick={() => fetchRouting()}>
        <TwoChoice
          recordApi={() => handleClick('RECORD')}
          saveApi={() => handleClick('SAVE')}
          choiceTitle="モードを選択して下さい"
          choice1="ストーリー"
          choice2="ラヴちゃんと会話する"
        />
      </Grid>
    </div>
  );
}

function Landing() {
  return LandingComponent;
}

export default Landing();
