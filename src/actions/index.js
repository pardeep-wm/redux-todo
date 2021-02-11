import todoApi from '../apis/todoApi';

export const fetchTodo = () => async dispatch => {
    const response = await todoApi.get('/todo_items.json?page=1');
    
    dispatch({ type: 'LIST_TODO', payload: response.data });
};


export const markUnmarkDelete = (itemID) => async dispatch => {
    const response = await todoApi.put(`/todo_items/${itemID}/mark_unmark_delete.json`)

    dispatch({type: 'MARK_UNMARK_DELETE', payload: response.data})
};

export const newTodo =(payload)=> async dispatch => {
    const response = await todoApi.post('/todo_items.json', payload)

    dispatch({type: 'ADD_TODO', payload: response.data })
};

export const updateTodo =(payload) => async dispatch => {
    const response = await todoApi.put(`/todo_items/${payload.id}.json`, payload.data)
    
    dispatch( {type: 'UPDATE_TODO', payload: response.data})
};

export const filterTodo = (payload) => async dispatch => {
    const response = await todoApi.get(`/todo_items/items_by_tag.json?tag=${payload.join(',')}`)
    
    dispatch( {type: 'FILTER_TODO', payload: { todos: response.data, tags: payload} })
};

export const setVisiblityFilter = (payload) => async dispatch => {
    const response = await todoApi.get(`/todo_items.json?show=${payload}`)
    
    dispatch( {type: 'SET_VISIBILITY_FILTER', payload: { todos: response.data, visibilityFilter: payload} })
};

