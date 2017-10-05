// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
// styles
import { Container, Row, Col } from './cssinjs';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting, form } = props;
  return (
    <Container>
      <Row>
        <Col sm={12} md={9} lg={9}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <div>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <div>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="sex">Sex</label>
              <div>
                <label htmlFor="sex">
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="male"
                  />{' '}
                  Male
                </label>
                <label htmlFor="sex">
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="female"
                  />{' '}
                  Female
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="favoriteColor">Favorite Color</label>
              <div>
                <Field name="favoriteColor" component="select">
                  <option />
                  <option value="ff0000">Red</option>
                  <option value="00ff00">Green</option>
                  <option value="0000ff">Blue</option>
                </Field>
              </div>
            </div>
            <div>
              <label htmlFor="employed">Employed</label>
              <div>
                <Field
                  name="employed"
                  id="employed"
                  component="input"
                  type="checkbox"
                />
              </div>
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <div>
                <Field name="notes" component="textarea" />
              </div>
            </div>
            <div>
              <button type="submit" disabled={pristine || submitting}>
                Submit
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
          </form>
        </Col>

        <Col sm={12} md={3} lg={3}>
          {form.simple !== undefined
            ? form.simple.registeredFields.map(data => (
                <div key={data.id}>
                  <span>firstName: {data.firstName}</span>
                  <br />
                  <span>lastName: {data.lastName}</span>
                  <br />
                  <span>email: {data.email}</span>
                  <br />
                  <span>sex: {data.sex}</span>
                  <br />
                  <br />
                  <span>favoriteColor: {data.favoriteColor}</span>
                  <br />
                  <span>employed: {data.employed}</span>
                  <br />
                  <span>notes: {data.notes}</span>
                  <br />
                </div>
              ))
            : ''}
        </Col>
      </Row>
    </Container>
  );
};

SimpleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  form: PropTypes.array.isRequired,
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);
