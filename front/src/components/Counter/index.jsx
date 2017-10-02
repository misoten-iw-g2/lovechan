// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// actions
import * as actions from '../../actions/calculations';

// class component
const Counter = props => (
  <p>
    Clicked: {props.counter.valueSeq().map(data => data)} times{' '}
    <button
      onClick={() => {
        props.increment();
      }}
    >
      +
    </button>{' '}
    <button
      onClick={() => {
        props.decrement();
      }}
    >
      -
    </button>
  </p>
);

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
