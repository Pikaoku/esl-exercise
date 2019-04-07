import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import App from './app/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from "./store/reducer";

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

const Index = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(
    <Index/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
