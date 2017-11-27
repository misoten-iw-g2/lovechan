/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Requests} from '../components/Pages';
import {actionTalksCreators} from '../actions';

const actions = actionTalksCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Requests),
);
