/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {Chat} from '../Templates';
import {url} from '../../config';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  chatRouting: (apiUrl: string) => void,
  talks: {
    wav: any,
    chatRoutingDatas: {
      question: string,
      choices: [],
      id: number,
    },
    chatData: [],
  },
};

class QuestionsComponent extends React.Component<Props> {
  async componentDidMount() {
    await this.props.chatRouting(url.apis.questions);
    // console.log(this.props);
  }

  async handleClick(action: string) {
    switch (action) {
      case 'RECORD':
        await this.props.recordAudio();
        break;
      case 'SAVE':
        await this.props.saveAudio();
        break;
      default:
        break;
    }
  }

  async fetchRouting() {
    const propWAV = this.props.talks.wav;
    if (propWAV !== null) {
      await this.props.routing(
        `http://localhost:8080/api/questions/${
          this.props.talks.chatRoutingDatas.id
        }/answers`,
        propWAV
      );
    }
  }

  render() {
    return (
      <div id="questions">
        <Grid width="100%" gap={0} onClick={() => this.fetchRouting()}>
          <Chat
            recordApi={() => this.handleClick('RECORD')}
            saveApi={() => this.handleClick('SAVE')}
            choiceTitle="お話しましょう！"
            firstQuestion={this.props.talks.chatRoutingDatas.question}
            choices={this.props.talks.chatData}
          />
        </Grid>
      </div>
    );
  }
}

function Questions() {
  return QuestionsComponent;
}

export default Questions();
