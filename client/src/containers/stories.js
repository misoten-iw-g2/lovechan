/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Stories} from '../components/Pages';
import {talksAction} from '../actions';

const actions = talksAction.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function StoriesContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(Stories);
}

export default StoriesContainer();
