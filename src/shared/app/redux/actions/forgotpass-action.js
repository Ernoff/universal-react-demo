import { Types } from "../constants";
import fetch from "isomorphic-unfetch";
import OktaAuth from "@okta/okta-auth-js";


export function forgot(email, url, password) {
  return async function(dispatch, getState) {
    let profile = forgotPasswordWithOKTA(email, url, password);
    console.log(profile)
    // dispatch({ type: Types.LOGIN_SUCCESS, profile });
  };
}

function forgotPasswordWithOKTA(email, url, password) {
  const body = {
    username: email,
    relayState: "/login"
  };
  console.log(body);

  const request = new Request(`${url}${Types.RECOVERY_URL}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `SSWS ${Types.api_token}`
    })
  });
  fetch(request)
    .then(res => {
      let recoveryToken = res.recoveryToken; 
      console.log(res);
      if (res.status === "RECOVERY") {
        return verifyToken(recoveryToken, url, password);
      }
    })
    .catch(err => console.log(err));
}

function verifyToken(token, url, password) {
  
  const body = {
    recoveryToken: token
  };
  console.log(body);

  const request = new Request(`${url}${Types.VERIFY_URL}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `SSWS ${Types.api_token}`
    })
  });
  fetch(request)
    .then(res => {
      let stateToken = res.stateToken;
      console.log(res);
      if (res.status === "RECOVERY") {
        return resetPassword(stateToken, url, password);
      }
    })
    .catch(err => console.log(err));
}


function resetPassword(token, url, password) {
  const body = {
    stateToken: token,
    newPassword: password
  };
  console.log(body);

  const request = new Request(`${url}${Types.RESET_URL}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `SSWS ${Types.api_token}`
    })
  });
  fetch(request)
    .then(res => {
      let stateToken = res.stateToken;
      console.log(res);
      if (res.status === "SUCCESS") {
        return res;
      }
    })
    .catch(err => console.log(err));
}
