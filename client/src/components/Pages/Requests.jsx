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
import {Choices} from '../Templates';
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
    choiceTitle: '何をしてほしいですか？',
    choices: ['踊って', '一発芸して'],
    apiUrl: url.apis.requests,
  }),
  withState('recording', 'recordingState', false),
  withHandlers({
    setRecording: ({recordingState}) => () => recordingState(true),
    clearRecording: ({recordingState}) => () => recordingState(false),
    getChoicesTitle: ({talks}) => () =>
      talks.routingDatas.question || talks.chatRoutingDatas.question,
    getChoices: ({talks}) => () =>
      talks.routingDatas.choices || talks.chatRoutingDatas.choices,
    getIsClear: ({talks}) => () => talks.routingDatas.is_clear,
  }),
  lifecycle({
    componentDidMount() {
      console.log('mounted');
    },
  }),
  shouldUpdate((props, nextProps) => nextProps.talks.wav !== props.talks.wav)
);

const EnhancedChoices = enhance(Choices);

function Requests(props: Props) {
  return (
    <div className={classNames('requests')}>
      <EnhancedChoices {...props} />
    </div>
  );
}

export default Requests;
