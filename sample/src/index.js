import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(<StylesProvider>
		<App />
	</StylesProvider>, document.getElementById('root'));

serviceWorkerRegistration.unregister();
reportWebVitals();
