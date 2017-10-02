// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// actions
import * as actions from '../../actions/courses';

// class component
class Courses extends React.Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
    readAll: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    await this.props.readAll();
  }

  render() {
    return (
      <div id="Courses">
        <h1>Courses</h1>
        <div>
          {this.props.courses.datas.map(data => (
            <div key={data.id}>
              <span>title: {data.title}</span>
              <br />
              <span>category: {data.category}</span>
              <br />
              <span>title: {data.title}</span>
              <br />
              <span>watchHref: {data.watchHref}</span>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
