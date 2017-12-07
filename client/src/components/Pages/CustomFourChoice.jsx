/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {FourChoice} from '../Templates';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {wav: any, routingDatas: {question: string, choices: [], url: string}},
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
    const {talks} = props;
    const propWAV = talks.wav;
    const apiURI = `http://localhost:8080${talks.routingDatas.url}`;
    console.log(apiURI);
    if (propWAV !== null) {
      await props.routing(apiURI, propWAV);
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
