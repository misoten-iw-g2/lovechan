/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Conversations from '../components/Conversations';
import {actionCreators} from '../reducers/talks';

const actions = actionCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

const ConversationsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Conversations),
);

export {ConversationsContainer as default, ConversationsContainer};
