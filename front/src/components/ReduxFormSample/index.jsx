// node_modules
import React from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// actions
import * as actions from '../../actions/courses';
// components
import SimpleForm from './SimpleForm';
// styles
import { Container, Row, Col } from './cssinjs';

// class component
class ReduxFormSample extends React.Component {
  static propTypes = {
    // reduxFormSample: PropTypes.object.isRequired,
    // readAll: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    // await this.props.readAll();
  }

  render() {
    return (
      <Container fluid id="reduxFormSample">
        <Row>
          <Col sm={12} md={12} lg={12}>
            <h1>ReduxFormSample</h1>
            <div>
              <SimpleForm />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  reduxFormSample: state.reduxFormSample,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormSample);
