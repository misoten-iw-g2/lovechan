/* @flow */
import * as React from 'react';
import ReactDOM from 'react-dom';
import Render from './Render';

ReactDOM.render(<Render />, document.querySelector('main'));

export default function () {
  console.log('App render');
}
