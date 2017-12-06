/* @flow */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CustomFourChoice} from '../components/Pages';
import {talksActions} from '../actions';

const actions = talksActions.talks;

const mapStateToProps = state => ({
  talks: state.talks.toJS(),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

function CustomFourChoiceContainer() {
  return connect(mapStateToProps, mapDispatchToProps)(CustomFourChoice);
}

export default CustomFourChoiceContainer();
