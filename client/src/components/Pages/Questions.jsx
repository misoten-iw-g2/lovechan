// @flow
import * as React from 'react';
import {
  compose,
  withProps,
  withState,
  withHandlers,
  shouldUpdate,
  lifecycle,
  type HOC,
} from 'recompose';
import classNames from 'classnames';
import {Chat} from '../Templates';
import {url} from '../../config';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {wav: any},
};

type EnhancedComponentProps = {
  choiceTitle: string,
  choices: string,
  apiUrl: string,
};

const enhance: HOC<*, EnhancedComponentProps> = compose(
  withProps({
    choiceTitle: 'お話しましょう！',
    choices: null,
    apiUrl: null,
  }),
  withState('recording', 'recordingState', false),
  withHandlers({
    setRecording: ({recordingState}) => () => recordingState(true),
    clearRecording: ({recordingState}) => () => recordingState(false),
    getApiUrl: ({talks}) => () =>
      `http://localhost:8080/api/questions/${
        talks.chatRoutingDatas.id
      }/answers`,
    getChoices: ({talks}) => () => talks.chatData,
    getChoicesTitle: ({talks}) => () =>
      talks.routingDatas.question || talks.chatRoutingDatas.question,
    getIsClear: ({talks}) => () => talks.routingDatas.is_clear,
  }),
  lifecycle({
    componentDidMount() {
      console.log('mounted');
      this.props.chatRouting(url.apis.questions);
    },
  }),
  shouldUpdate(
    (props, nextProps) =>
      nextProps.talks.wav !== props.talks.wav ||
      nextProps.talks.chatData !== props.talks.chatData
  )
);

const EnhancedChat = enhance(Chat);

function Questions(props: Props) {
  return (
    <div className={classNames('questions')}>
      <EnhancedChat {...props} />
    </div>
  );
}

export default Questions;
