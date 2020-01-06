import React from 'react';
import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

import 'sanitize.css';
import App from './components/App';

JavascriptTimeAgo.addLocale(en);

// console.log(process.env.NODE_ENV);

ReactDOM.render(<App/>, document.getElementById('root'));
