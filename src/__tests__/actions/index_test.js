import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { loadTodos } from '../../actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });
});


it('creates FETCH_TODO action', () => {

    fetchMock.getOnce('/todo_items.json?page=1',{
        body: { todos: [' do something']},
        headers: { 'content-type': 'application/json'}
    });
    
    const expectedActions = ['LIST_TODO']

    const store = mockStore({todos: [] })
    return store.dispatch(loadTodos()).then(() => {
        const actions = store.getActions().map(action => action.type)
        expect(actions).toEqual(expectedActions)
    })
});