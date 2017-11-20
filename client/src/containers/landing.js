/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Landing from '../components/Landing';
import {actionCreators} from '../reducers/talks';

const actions = actionCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

const LandingContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Landing),
);

export {LandingContainer as default, LandingContainer};