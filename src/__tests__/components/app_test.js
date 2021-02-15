import React from 'react';
import App from '../../components/app';
import { mount } from 'enzyme';

// We need to wrap CommentBox with <Provider> tag in first beforeEach(() => {}) below;
// otherwise we receive this error message:
// Invariant Violation: Could not find “store” in either the context or props of “Connect(CommentBox)”
// https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
// Also see comment_list.test.js
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import reducers from '../../reducers';
import thunk from 'redux-thunk';

configure({adapter: new Adapter()});
const createStoreWithMiddleware = createStore(reducers, applyMiddleware(thunk));

// Use 'describe' to group together similar tests
describe('App', () => {

    let component;

    beforeEach(() => {
        component = mount(<Provider store={createStoreWithMiddleware}><App /></Provider>);
    });

    // Use 'test' or 'it' (both possible) to test a single attribute of a target
    test('it should show container element', () => {

        expect(component.find('.container').length).toBe(1);
    });

    test('it should show ui element', () => {
        expect(component.find('.ui').length).toBe(1);
    });
});

