// We import React here in order to use it.
import React from 'react';
// This allows us to render and alter content dynamically on the DOM (https://reactjs.org/docs/react-dom.html)
import { render } from 'react-dom';
// This allows us to create a front-end 'Router', to allow the user to navigate throughout our components without having to reload the page each time (https://reacttraining.com/react-router/web/api/BrowserRouter)
import { BrowserRouter } from 'react-router-dom';
// This imports our actual App in order to display it to our browser.
import App from './App.js';

// 'render' is what allows the App to be displayed. It's held inside of a 'Router' (BrowserRouter) so in the future we can implement additional route options. The entire thing is rendered at the element 'id' via HTML.
render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));