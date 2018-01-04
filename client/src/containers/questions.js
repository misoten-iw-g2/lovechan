/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Questions} from '../components/Pages';
import {talksAction} from '../actions';

const actions = talksAction.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function QuestionsContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(Questions);
}

export default QuestionsContainer();
