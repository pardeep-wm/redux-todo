import { combineReducers } from "redux";

const todoReducer = (state=[], action) => {
    switch(action.type){
        case 'LIST_TODO':
            return action.payload;
        case 'ADD_TODO':
            return [action.payload, ...state]
        case 'UPDATE_TODO':
            let arr = [...state]
            let itemIndex = arr.findIndex(elm => elm.todo_item.id.$oid == action.payload.todo_item.id.$oid);
            arr[itemIndex] = action.payload
            return arr;
        case 'MARK_UNMARK_DELETE':
            let newArr = state.filter(todo => {
                if (todo.todo_item.id.$oid === action.payload.todo_item.id.$oid){
                    todo.todo_item.is_deleted = action.payload.todo_item.is_deleted
                    return todo;
                }
                return todo;
            });
            return newArr;
        case 'FILTER_TODO':
            return action.payload.todos
        
        case 'SET_VISIBILITY_FILTER':
            return action.payload.todos

        default:
            return state 
    }

};
const filterReducer = (state=[], action) => {
    switch(action.type){
        case 'FILTER_TODO':
            return action.payload.tags
        default:
            return state
    }
}

const visibilityFilter = (state='All', action) => {
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.payload.visibilityFilter
        default:
            return state;
    }
}

export default combineReducers({
    todos: todoReducer,
    filterTags: filterReducer,
    visibilityFilter: visibilityFilter
})