import React from 'react';
import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

JavascriptTimeAgo.locale(en)


import './css/base.css';
import App from './components/App/index.jsx';

// console.log(process.env.NODE_ENV);

ReactDOM.render(<App/>, document.getElementById('main'));