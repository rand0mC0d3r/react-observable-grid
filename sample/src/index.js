import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(<React.StrictMode>
	<StylesProvider generateClassName={createGenerateClassName({ disableGlobal: true, seed: 'rgo' })}>
		<App />
	</StylesProvider>
</React.StrictMode>, document.getElementById('root'));

serviceWorkerRegistration.register();
reportWebVitals();
