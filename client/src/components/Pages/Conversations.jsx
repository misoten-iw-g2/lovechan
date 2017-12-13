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
};

function ConversationsComponent(props: Props) {
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
      await props.routing(url.apis.conversations, propWAV);
    }
  };

  return (
    <div id="conversations">
      <Grid width="100%" gap={0} onClick={() => fetchRouting()}>
        <TwoChoice
          recordApi={() => handleClick('RECORD')}
          saveApi={() => handleClick('SAVE')}
          choiceTitle="ラブちゃんとしたいことを選んで下さい"
          choice1="何かお願いする"
          choice2="質問してもらう"
        />
      </Grid>
    </div>
  );
}

function Conversations() {
  return ConversationsComponent;
}

export default Conversations();
