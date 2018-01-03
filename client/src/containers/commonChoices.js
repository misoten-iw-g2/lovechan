/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CommonChoices} from '../components/Pages';
import {talksAction} from '../actions';

const actions = talksAction.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function CommonChoicesContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(CommonChoices);
}

export default CommonChoicesContainer();
