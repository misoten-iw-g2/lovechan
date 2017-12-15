/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {TwoChoice} from '../Templates';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {
    wav: any,
    routingDatas: {
      question: string,
      choices: [],
      url: string,
      is_clear: boolean,
    },
    chatRoutingDatas: {
      choices: [],
      question: string,
      id: number,
    },
  },
};

function RequestsComponent(props: Props) {
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

    const apiURI = `http://localhost:8080/api/requests`;
    if (propWAV !== null) {
      await props.routing(apiURI, propWAV);
    }
  };

  return (
    <div id="requests">
      <Grid width="100%" gap={0} onClick={() => fetchRouting()}>
        <TwoChoice
          recordApi={() => handleClick('RECORD')}
          saveApi={() => handleClick('SAVE')}
          choiceTitle="何をしてほしいですか？"
          choice1="踊って"
          choice2="一発芸して"
        />
      </Grid>
    </div>
  );
}

function Requests() {
  return RequestsComponent;
}

export default Requests();
