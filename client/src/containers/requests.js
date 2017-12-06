/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Requests} from '../components/Pages';
import {talksActions} from '../actions';

const actions = talksActions.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function RequestsContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(Requests);
}

export default RequestsContainer();
