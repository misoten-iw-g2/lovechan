/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import * as myself from './Landing';
import {TwoChoice} from '../Templates';
import {apiUrls} from '../../config/url';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {toJS: () => any},
};

export const Landing = (props: Props) => {
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
    const propWAV = props.talks.toJS().wav;
    if (propWAV !== null) {
      await props.routing(apiUrls.root, propWAV);
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
};

export default Object.assign(withRouter(Landing), myself);
