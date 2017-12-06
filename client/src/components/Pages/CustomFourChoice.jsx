/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {FourChoice} from '../Templates';
import {url} from '../../config';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {wav: any, routingDatas: {question: string, choices: []}},
};

function CustomFourChoiceComponent(props: Props) {
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
        <FourChoice
          recordApi={() => handleClick('RECORD')}
          saveApi={() => handleClick('SAVE')}
          choiceTitle={props.talks.routingDatas.question}
          choices={props.talks.routingDatas.choices}
        />
      </Grid>
    </div>
  );
}

function CustomFourChoice() {
  return CustomFourChoiceComponent;
}

export default CustomFourChoice();
