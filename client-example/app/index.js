import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

require('react-tap-event-plugin')();
require('normalize-css');

ReactDom.render(<App />, document.getElementById('main'));

