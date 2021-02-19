import React from 'react';
import VisibilityFilters from '../../components/visibilityFilters';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TODO_ITEMS from '../../fixtures/todos';
import { setVisiblityFilter } from '../../actions'


const mockStore = configureStore([thunk]);


configure({adapter: new Adapter()});

describe('VisibilityFilters', () => {
    let store;
    let component;
    
    beforeEach(() => {
        store = mockStore({
            todos: TODO_ITEMS,
            filterTags: [],
            visibilityFilter: 'All'
        })

        store.dispatch = jest.fn();
        component = renderer.create(<Provider store={store}><VisibilityFilters setVisiblityFilter={setVisiblityFilter}/></Provider>);
    })

    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should dispatch an action on button click', () => {
        renderer.act(() => {
          component.root.findByProps({color: 'primary'}).props.onClick();
        });
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });


});

