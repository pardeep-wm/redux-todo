import React from 'react';
import NavBar from '../../components/navBar';
import AddTodo from '../../components/addTodo';
import { mount } from 'enzyme';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TODO_ITEMS from '../../fixtures/todos';

configure({adapter: new Adapter()});
const mockStore = configureStore([thunk]);

describe('TodoList', () => {

    let store
    let component;

    beforeEach(() => {
        store = mockStore({
            todos: TODO_ITEMS,
            filterTags: [],
            visibilityFilter: 'All'
        })
        component = mount(<Provider store={store}><NavBar /></Provider>);
    });


    test('it should have navbar component', () => {
        const todo = component.find(AddTodo).first()

        expect(todo.exists()).toBe(true)
    });

});