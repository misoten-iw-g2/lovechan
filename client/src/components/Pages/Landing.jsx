/* @flow */
import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  compose,
  defaultProps,
  setDisplayName,
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
import {talksAction} from '../../actions';

/**
 * types
 */
type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {wav: any},
};
type EnhancedComponentProps = {
  choiceTitle?: string,
  choices?: string,
  apiUrl?: string,
};

/**
 * redux connecter
 */
const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, talksAction.talks), dispatch);

/**
 * enhancer
 */
const enhance: HOC<*, EnhancedComponentProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  setDisplayName('Choices'),
  defaultProps({
    choiceTitle: 'モードを選択して下さい',
    choices: ['ストーリー', '話す'],
    apiUrl: url.apis.root,
    isClear: false,
  }),
  withHandlers({
    // getChoicesTitle: ({talks}) => () =>
    //   talks.routingDatas.question || talks.chatRoutingDatas.question,
    // getChoices: ({talks}) => () =>
    //   talks.routingDatas.choices || talks.chatRoutingDatas.choices,
    // getIsClear: ({talks}) => () => talks.routingDatas.is_clear,
  }),
  lifecycle({
    componentDidMount() {
      console.log('mounted');
    },
  }),
  shouldUpdate((props, nextProps) => true)
);

/**
 * DI Choice
 */
const EnhancedChoices = enhance(props => <Choices {...props} />);

function Landing() {
  return (
    <div className={classNames('landing')}>
      <EnhancedChoices />
    </div>
  );
}

export default Landing;
