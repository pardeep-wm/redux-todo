import React from 'react';
import TodoList from '../../components/todoList';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TODO_ITEMS from '../../fixtures/todos';


const mockStore = configureStore([thunk]);


configure({adapter: new Adapter()});

describe('TodoList', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            todos: TODO_ITEMS,
            filterTags: [],
            visibilityFilter: 'All'
        })
        component = renderer.create(<Provider store={store}><TodoList/></Provider>);
    })

    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    }); 

});

