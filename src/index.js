import { createRoot } from 'react-dom/client'
import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

import App from './components/App'

JavascriptTimeAgo.addLocale(en)

// console.log(process.env.NODE_ENV);

const container = document.getElementsByTagName('main')[0]
const root = createRoot(container)

root.render(<App />, root)
