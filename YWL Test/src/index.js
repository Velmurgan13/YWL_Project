import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom' 
import { RecoilRoot } from 'recoil';
// import SimpleReactLightbox from 'simple-react-lightbox';
// import './GlobalStyle/variable.scss'
// import './GlobalStyle/fontStyle.scss'
// import './GlobalStyle/buttonStyle.scss'
ReactDOM.render(
  <RecoilRoot>
  <Router  basename={process.env.PUBLIC_URL}>
    <App />  
  </Router>
  </RecoilRoot>,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();