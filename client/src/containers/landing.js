/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Landing} from '../components/Pages';
import {talksAction} from '../actions';

const actions = talksAction.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function LandingContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(Landing);
}

export default LandingContainer();
