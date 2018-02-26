import { Types } from '../constants';
import Request from 'axios';

export function getName(user) {
    return async function (dispatch, getState) {
        // let {data} = await getUserFromAPI(id);
        dispatch({ type: Types.UPDATE_NAME, payload: user });
    }
}
// function getUserFromAPI(id) {
//     return Request.get(`https://jsonplaceholder.typicode.com/users/${id}`);
// }

// function getUserFromAuth(){

// }