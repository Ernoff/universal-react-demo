import { combineReducers } from 'redux';
import userReducer from "./user-reducer";
import loginReducer from './login-reducer';

const reducers = combineReducers({
    user: userReducer,
    userAuth: loginReducer
});

export default reducers;
