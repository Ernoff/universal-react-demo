import { Types } from "../constants";
import fetch from "isomorphic-unfetch";
import OktaAuth from '@okta/okta-auth-js';


export function login(username, password, url) {
  return async function(dispatch, getState) {
    let profile = await loginUserFromOKTA(username, password, url);
    // console.log(profile)
    dispatch({ type: Types.LOGIN_SUCCESS, profile });
    
  };
}
function loginUserFromOKTA(username, password, url) {
   let profile;
  let oktaAuth = new OktaAuth({url})
 return oktaAuth.signIn({username, password})
  .then(res => {
    // console.log(res.data)
     profile = res.data;
     return profile
  }).catch(err => console.error(err))
}

 export function register(firstName, lastName, password, email, url, question, answer) {
  return async function(dispatch, getState) {
    let profile = await registerUserFromOKTA(firstName, lastName, password, email, url, question, answer);
  //  console.log(profile);
  //  console.log("profile");
    // dispatch({ type: Types.LOGIN_SUCCESS, profile });
  };  
 }
async function registerUserFromOKTA(firstName, lastName, email, password, url, question, answer) {
  const body = { firstName:firstName, lastName:lastName,email:email, login: email, question:question, answer:answer, 
    password:password, url:`${url}${Types.REGISTRATION}`, auth: `SSWS ${Types.api_token}` };
  // const body = {
  //   "profile": {
  //     "firstName": firstName,
  //     "lastName": lastName,
  //     "email": email,
  //     "login": email
  //   },
  //   "credentials":{
  //     "password": {"value": password },
  //     "recovery_question": {
  //       "question": question,
  //       "answer": answer
  //     }
  //   }
  // }
  // console.log(body);
   const request = new Request("/regis", {
     method: "POST",
     body: JSON.stringify(body),
     headers: new Headers({
       "Content-Type": "application/json",
       Accept: "application/json"
     })
   });
  //  console.log(this.props.history)
   await fetch(request)
     .then(res => {
      //  if (res.status === 200) {
      //    return loginUserFromOKTA(email, password, url);
      //  }
      // console.log('client')
      console.log(res)
     })
     .catch(err => console.log(err));
 }