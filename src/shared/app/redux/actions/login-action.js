import { Types } from "../constants/login-types";
import fetch from "isomorphic-unfetch";
import OktaAuth from '@okta/okta-auth-js';

export function login(username, password, url) {
  return async function(dispatch, getState) {
    let profile = await loginUserFromOKTA(username, password, url);
    console.log(profile)
    dispatch({ type: Types.LOGIN_SUCCESS, profile });
    
  };
}
function loginUserFromOKTA(username, password, url) {
   let profile;
  let oktaAuth = new OktaAuth({url})
 return oktaAuth.signIn({username, password})
  .then(res => {
    console.log(res.data)
     profile = res.data;
     return profile
  }).catch(err => console.error(err))
}

 export function register(firstName, lastName, password, email, url) {
  return async function(dispatch, getState) {
    let profile = await registerUserFromOKTA(firstName, lastName, password, email, url);
    dispatch({ type: Types.LOGIN_SUCCESS, profile });
  };  
 }

 function registerUserFromOKTA(firstName, lastName, email, password, url) {
   const body = { firstName:firstName, lastName:lastName,email:email, login: email, password:password };
   console.log(body);
   
   const request = new Request("/regis", {
     method: "POST",
     body: JSON.stringify(body),
     headers: new Headers({
       "Content-Type": "application/json",
       Accept: "application/json"
     })
   });
   fetch(request)
     .then(res =>{
       if(res.status === 201){
        return loginUserFromOKTA(email, password, url);
       }
     })
     .catch(err => console.log(err));
 }