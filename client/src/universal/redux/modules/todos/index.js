import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, COMPLETE_TODO, SET_TODOS_FILTER } from '../../../constants/action_types';
import { SHOW_ALL } from '../../../constants';
import {v4} from 'uuid';

const TODOS_INITIAL_STATE = [];

export function todosReducer(state = TODOS_INITIAL_STATE,action){
  
  switch(action.type){
    case ADD_TODO:
      return [...state,{
        id: v4(),
        title: action.payload,
        completed: false
      }];
    case REMOVE_TODO: 
      return [...state].filter(todo => todo.id !== action.payload);
    case TOGGLE_TODO: 
      const index = state.findIndex(todo => todo.id === action.payload);
      const toggledTodo = {...state[index],completed: ! state[index].completed};
      return [...state].filter(todo => todo.id !== action.payload).concat([toggledTodo]);
  }
  return state;
}

const FILTER_INITIAL_STATE = SHOW_ALL;

export function todosFilterReducer(state = FILTER_INITIAL_STATE, action){
  if(action.type === SET_TODOS_FILTER){
    return action.payload;
  }
  return state;
}

export function setTodosFilter(filter){
  return { 
    type: SET_TODOS_FILTER,
    payload: filter
  }
}

export function addTodo(todo){
  return {
    type: ADD_TODO,
    payload: todo
  }
}

export function removeTodo(id){
  return {
    type: REMOVE_TODO,
    payload: id
  }
}

export function toggleTodo(id){
  return {
    type: TOGGLE_TODO,
    payload: id
  }
}


export function loginUser(history,{email, password}){
    return dispatch =>  {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
        return fetch(`${API_URL}/auth/login`,{
            method: "POST",
            redirect: 'follow',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
        .then(response => (response.json()))
        .then(response => {
            localStorage.setItem(JWT_TOKEN, response.token);
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true));
            history.push('/dashboard');
        }).catch(error => {
            toastr.error(error.message);
            console.log(error);
        });
    }
} 