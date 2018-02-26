import { Types } from '../constants';

const initialState = {
  firstName: null,
  lastName: null,
  login: null,
  sessionToken: null,
  expiresAt: null,
  email: null
};
export default function loginReducer(state = initialState, action){
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
            return {...state, login: action.profile._embedded.user.profile.login,
                firstName: action.profile._embedded.user.profile.firstName,
                lastName: action.profile._embedded.user.profile.lastName,
                sessionToken:action.profile.sessionToken,
                expiresAt:action.profile.expiresAt}
        default:
            return state;
    }
}