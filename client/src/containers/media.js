/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Media} from '../components/Media';
import {talksActions} from '../actions';

const actions = talksActions.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function MediaContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(Media);
}

export default MediaContainer();
