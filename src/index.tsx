import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import { Provider } from 'react-redux';
import store from './store/store'; // Asegúrate de importar tu store correctamente
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Crea la raíz
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store/store'; // Asegúrate de importar tu store correctamente
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();
