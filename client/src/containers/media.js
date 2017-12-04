/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Media} from '../components/Media';
import {talksActions} from '../actions';

const actions = talksActions.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function MediaContainer() {
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Media));
}

export default MediaContainer();
