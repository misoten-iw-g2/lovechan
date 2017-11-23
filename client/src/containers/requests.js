/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Requests from '../components/Requests';
import {actionCreators} from '../reducers/talks';

const actions = actionCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

const RequestsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Requests),
);

export {RequestsContainer as default, RequestsContainer};
