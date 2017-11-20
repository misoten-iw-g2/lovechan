/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Stories from '../components/Stories';
import {actionCreators} from '../reducers/talks';

const actions = actionCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

const StoriesContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Stories),
);

export {StoriesContainer as default, StoriesContainer};
