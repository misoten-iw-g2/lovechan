/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Conversations} from '../components/Pages';
import {talksAction} from '../actions';

const actions = talksAction.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function ConversationsContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(Conversations);
}

export default ConversationsContainer();
