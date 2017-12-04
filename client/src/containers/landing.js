/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Landing} from '../components/Pages';
import {talksActions} from '../actions';

const actions = talksActions.talks;

const mapStateToProps = state => ({
  talks: state.talks,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function LandingContainer() {
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
}

export default LandingContainer();
