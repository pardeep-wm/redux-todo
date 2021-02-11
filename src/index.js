import React from 'react';
import ReactDom from 'react-dom'
import  { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import reducers from './reducers'
import TodoList from './components/todoList'
const App = () => {
    return <div className="ui container"><TodoList /></div>
};

const store = createStore(reducers, applyMiddleware(thunk));
ReactDom.render(
    <Provider store={ store }>
        <App />
    </Provider>, document.querySelector('#root'))

