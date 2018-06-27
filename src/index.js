import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app = <App/>;
// const app = React.createElement(App, null);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
