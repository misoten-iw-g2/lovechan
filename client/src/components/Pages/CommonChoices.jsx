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
    choiceTitle: '',
    choices: [],
    apiUrl: '',
  }),
  withState('recording', 'recordingState', false),
  withHandlers({
    setRecording: ({recordingState}) => () => recordingState(true),
    clearRecording: ({recordingState}) => () => recordingState(false),
    getApiUrl: ({talks}) => () =>
      `http://localhost:8080/api/questions/${
        talks.chatRoutingDatas.id
      }/answers`,
    getChoicesTitle: ({talks}) => () =>
      talks.routingDatas.question || talks.chatRoutingDatas.question || '',
    getChoices: ({talks}) => () =>
      talks.routingDatas.choices || talks.chatRoutingDatas.choices || [],
    getIsClear: ({talks}) => () => talks.routingDatas.is_clear,
  }),
  lifecycle({
    componentDidMount() {
      console.log('mounted');
    },
  }),
  shouldUpdate(
    (props, nextProps) =>
      nextProps.talks.wav !== props.talks.wav ||
      nextProps.routingDatas.question !== props.routingDatas.question ||
      nextProps.routingDatas.choices !== props.routingDatas.choices ||
      nextProps.talks.routingDatas.is_clear !==
        props.talks.routingDatas.is_clear
  )
);

const EnhancedChoices = enhance(Choices);

function CommonChoices(props: Props) {
  return (
    <div className={classNames('common_choices')}>
      <EnhancedChoices {...props} />
    </div>
  );
}

export default CommonChoices;
