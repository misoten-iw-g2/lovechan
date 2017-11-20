/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Media from '../components/Media';
import {actionCreators} from '../reducers/talks';

const actions = actionCreators.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

const MediaContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Media),
);

export {MediaContainer as default, MediaContainer};
