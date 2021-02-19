import React from 'react';
import TodoItem from '../../components/todoItem';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TODO_ITEMS from '../../fixtures/todos';
import Chip from '@material-ui/core/Chip';


const mockStore = configureStore([thunk]);


configure({adapter: new Adapter()});

describe('TodoItem', () => {
    let store;
    let component;
    let compProps;
    beforeEach(() => {
        store = mockStore({
            todos: TODO_ITEMS,
            filterTags: [],
            visibilityFilter: 'All'
        })

        store.dispatch = jest.fn();
        compProps = {todo: TODO_ITEMS[0].todo_item}
        component = renderer.create(<Provider store={store}><TodoItem {...compProps}/></Provider>);
    })

    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should dispatch an action on button click', () => {
        renderer.act(() => {
          component.root.findByProps({id: 'deleteButton'}).props.onClick();
        });
     
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action on status change', () => {
        const event = {target: {value: 'start'}}
        renderer.act(()=>{
            component.root.findByProps({id: 'statustag'}).props.onChange(event);
        })
        expect(store.dispatch).toHaveBeenCalledTimes(1)
    })

});

