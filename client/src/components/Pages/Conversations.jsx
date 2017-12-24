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
    choiceTitle: 'ラヴちゃんとしたいことを選んで下さい',
    choices: ['何かお願いする', '質問してもらう'],
    apiUrl: url.apis.conversations,
  }),
  withState('recording', 'recordingState', false),
  withHandlers({
    setRecording: ({recordingState}) => () => recordingState(true),
    clearRecording: ({recordingState}) => () => recordingState(false),
  }),
  lifecycle({
    componentDidMount() {
      console.log('mounted');
    },
  }),
  shouldUpdate((props, nextProps) => nextProps.talks.wav !== props.talks.wav)
);

const EnhancedChoices = enhance(Choices);

function Conversations(props: Props) {
  return (
    <div className={classNames('conversations')}>
      <EnhancedChoices {...props} />
    </div>
  );
}

export default Conversations;
