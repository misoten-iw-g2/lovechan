/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {FourChoice} from '../Templates';

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

    if (talks.routingDatas.url !== undefined) {
      const apiURI = `http://localhost:8080${talks.routingDatas.url}`;
      if (propWAV !== null) {
        await props.routing(apiURI, propWAV);
      }
    } else if (talks.chatRoutingDatas) {
      await props.routing(
        `http://localhost:8080/api/questions/${
          props.talks.chatRoutingDatas.id
        }/answers`,
        propWAV
      );
    }
  };

  return (
    <div id="landing">
      <Grid width="100%" gap={0} onClick={() => fetchRouting()}>
        <FourChoice
          recordApi={() => handleClick('RECORD')}
          saveApi={() => handleClick('SAVE')}
          choiceTitle={
            props.talks.routingDatas.question ||
            props.talks.chatRoutingDatas.question
          }
          choices={
            props.talks.routingDatas.choices ||
            props.talks.chatRoutingDatas.choices
          }
          isClear={props.talks.routingDatas.is_clear}
        />
      </Grid>
    </div>
  );
}

function CustomFourChoice() {
  return CustomFourChoiceComponent;
}

export default CustomFourChoice();
