/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Questions from '../components/Questions';
import {actionCreators} from '../reducers/talks';

const actions = actionCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

const QuestionsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Questions),
);

export {QuestionsContainer as default, QuestionsContainer};
