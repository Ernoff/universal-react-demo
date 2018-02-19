import Navbar from '../app/navbar.jsx';
import Home from "../app/home.jsx";
import ImplicitCallback from "../app/homepad.jsx";
// import HomePad from "../app/homepad.jsx";
import LoginForm from "../app/loginform.jsx";
import ForgetPass from "../app/forgetpass.jsx";
import ResetPass from "../app/resetpass.jsx";
import Login from "../app/login.jsx";
import RegisterForm from '../app/registerform.jsx';
import User from '../app/user.jsx';

export default {
  proutes: [
    {
      path: "/",
      component: Home,
      exact: true
    },
    {
      path: "/user",
      component: User,
      exact: true
    }
  ],
  routes: [
    {
      path: "/login",
      component: Login,
      exact: true
    },
    {
      path: "/regis",
      component: RegisterForm,
      exact: true
    },
    {
      path: "/forgotpass",
      component: ForgetPass,
      exact: true
    },
    {
      path: "/resetpass",
      component: ResetPass,
      exact: true
    },
    {
      path: "/implicit/callback",
      component: ImplicitCallback,
      exact: true
    }
  ],
  redirects: [
    {
      from: "/people",
      to: "/user",
      status: 301
    }
  ]
}; 