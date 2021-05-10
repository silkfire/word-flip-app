import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

import App from './components/App';

JavascriptTimeAgo.addLocale(en);

// console.log(process.env.NODE_ENV);

ReactDOM.render(<App/>, document.getElementsByTagName('main')[0]);
