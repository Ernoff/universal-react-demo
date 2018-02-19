/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@okta/okta-react");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.register = register;

var _loginTypes = __webpack_require__(12);

var _isomorphicUnfetch = __webpack_require__(36);

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _oktaAuthJs = __webpack_require__(6);

var _oktaAuthJs2 = _interopRequireDefault(_oktaAuthJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login(username, password, url) {
  return async function (dispatch, getState) {
    var profile = await loginUserFromOKTA(username, password, url);
    console.log(profile);
    dispatch({ type: _loginTypes.Types.LOGIN_SUCCESS, profile: profile });
  };
}
function loginUserFromOKTA(username, password, url) {
  var profile = void 0;
  var oktaAuth = new _oktaAuthJs2.default({ url: url });
  return oktaAuth.signIn({ username: username, password: password }).then(function (res) {
    console.log(res.data);
    profile = res.data;
    return profile;
  }).catch(function (err) {
    return console.error(err);
  });
}

function register(firstName, lastName, password, email, url) {
  return async function (dispatch, getState) {
    var profile = await registerUserFromOKTA(firstName, lastName, password, email, url);
    dispatch({ type: _loginTypes.Types.LOGIN_SUCCESS, profile: profile });
  };
}

function registerUserFromOKTA(firstName, lastName, email, password, url) {
  var body = { firstName: firstName, lastName: lastName, email: email, login: email, password: password };
  console.log(body);

  var request = new Request("/regis", {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    })
  });
  (0, _isomorphicUnfetch2.default)(request).then(function (res) {
    if (res.status === 201) {
      return loginUserFromOKTA(email, password, url);
    }
  }).catch(function (err) {
    return console.log(err);
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@okta/okta-auth-js");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _oktaAuthJs = __webpack_require__(6);

var _oktaAuthJs2 = _interopRequireDefault(_oktaAuthJs);

var _oktaReact = __webpack_require__(2);

var _redux = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _loginAction = __webpack_require__(5);

var actions = _interopRequireWildcard(_loginAction);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  _createClass(LoginForm, null, [{
    key: 'fetchData',
    value: function fetchData(_ref) {
      var store = _ref.store;

      return store.getState(); //default
    }
  }]);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.state = {
      sessionToken: null,
      error: null,
      username: "",
      password: ""
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleUsernameChange = _this.handleUsernameChange.bind(_this);
    _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var _state = this.state,
          username = _state.username,
          password = _state.password;

      var url = this.props.auth._config.baseUrl;

      if (username && password) {
        this.props.login(username, password, url);
      }
    }
  }, {
    key: 'handleUsernameChange',
    value: function handleUsernameChange(e) {
      this.setState({ username: e.target.value });
    }
  }, {
    key: 'handlePasswordChange',
    value: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.userAuth.sessionToken) {
        try {
          this.props.auth.redirect({ sessionToken: this.props.userAuth.sessionToken });
          return null;
        } catch (e) {
          console.log(e);
        }
      }

      var errorMessage = this.state.error ? _react2.default.createElement(
        'span',
        { className: 'error-message' },
        this.state.error
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col align-self-center' },
            _react2.default.createElement(
              'form',
              { onSubmit: this.handleSubmit },
              errorMessage,
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'username' },
                  'Username:'
                ),
                _react2.default.createElement('input', {
                  className: 'form-control',
                  id: 'username',
                  type: 'text',
                  value: this.state.username,
                  onChange: this.handleUsernameChange
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'password' },
                  'Password:'
                ),
                _react2.default.createElement('input', {
                  className: 'form-control',
                  id: 'password',
                  type: 'password',
                  value: this.state.password,
                  onChange: this.handlePasswordChange
                })
              ),
              _react2.default.createElement('input', { id: 'submit', type: 'submit', value: 'Submit', className: 'btn btn-primary' })
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
              'p',
              null,
              'If you have no account click below to register'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/regis' },
              ' ',
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-secondary btn-lg btn-block' },
                'SignUp'
              ),
              ' '
            )
          )
        )
      );
    }
  }]);

  return LoginForm;
}(_react2.default.Component);

;

function mapStateToProps(state) {
  return _extends({}, state);
}
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _oktaReact.withAuth)(LoginForm));

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedirectWithStatus = function RedirectWithStatus(_ref) {
    var key = _ref.key,
        from = _ref.from,
        to = _ref.to,
        status = _ref.status;
    return _react2.default.createElement(_reactRouterDom.Route, { render: function render(_ref2) {
            var staticContext = _ref2.staticContext;

            // there is no `staticContext` on the client, so
            // we need to guard against that here
            if (staticContext) staticContext.status = status;
            return _react2.default.createElement(_reactRouterDom.Redirect, { key: key, from: from, to: to });
        } });
};
exports.default = RedirectWithStatus;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navbar = __webpack_require__(11);

var _navbar2 = _interopRequireDefault(_navbar);

var _home = __webpack_require__(26);

var _home2 = _interopRequireDefault(_home);

var _homepad = __webpack_require__(27);

var _homepad2 = _interopRequireDefault(_homepad);

var _loginform = __webpack_require__(7);

var _loginform2 = _interopRequireDefault(_loginform);

var _forgetpass = __webpack_require__(25);

var _forgetpass2 = _interopRequireDefault(_forgetpass);

var _resetpass = __webpack_require__(33);

var _resetpass2 = _interopRequireDefault(_resetpass);

var _login = __webpack_require__(28);

var _login2 = _interopRequireDefault(_login);

var _registerform = __webpack_require__(32);

var _registerform2 = _interopRequireDefault(_registerform);

var _user = __webpack_require__(34);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import HomePad from "../app/homepad.jsx";
exports.default = {
  proutes: [{
    path: "/",
    component: _home2.default,
    exact: true
  }, {
    path: "/user",
    component: _user2.default,
    exact: true
  }],
  routes: [{
    path: "/login",
    component: _login2.default,
    exact: true
  }, {
    path: "/regis",
    component: _registerform2.default,
    exact: true
  }, {
    path: "/forgotpass",
    component: _forgetpass2.default,
    exact: true
  }, {
    path: "/resetpass",
    component: _resetpass2.default,
    exact: true
  }, {
    path: "/implicit/callback",
    component: _homepad2.default,
    exact: true
  }],
  redirects: [{
    from: "/people",
    to: "/user",
    status: 301
  }]
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'nav',
                { className: 'nav nav-pills flex-column flex-sm-row' },
                _react2.default.createElement(
                    'span',
                    { className: 'flex-sm-fill text-sm-center nav-link' },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/' },
                        'Home'
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'flex-sm-fill text-sm-center nav-link' },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/user' },
                        'User'
                    )
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Types = exports.Types = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  REGISTER_ERROR: "REGISTER_ERROR"
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Types = exports.Types = {
    UPDATE_NAME: 'UPDATE_NAME'
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _redirectWStatus = __webpack_require__(9);

var _redirectWStatus2 = _interopRequireDefault(_redirectWStatus);

var _navbar = __webpack_require__(11);

var _navbar2 = _interopRequireDefault(_navbar);

var _routes = __webpack_require__(10);

var _routes2 = _interopRequireDefault(_routes);

var _loginform = __webpack_require__(7);

var _loginform2 = _interopRequireDefault(_loginform);

var _ = __webpack_require__(24);

var _2 = _interopRequireDefault(_);

var _oktaReact = __webpack_require__(2);

var _loginAction = __webpack_require__(5);

var _loginAction2 = _interopRequireDefault(_loginAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var proutes = _routes2.default.proutes.map(function (_ref, i) {
                var path = _ref.path,
                    component = _ref.component,
                    exact = _ref.exact;
                return _react2.default.createElement(_oktaReact.SecureRoute, { key: Math.random() + 'ROUTE_', exact: exact, path: path, component: component });
            });

            var routes = _routes2.default.routes.map(function (_ref2, i) {
                var path = _ref2.path,
                    component = _ref2.component,
                    exact = _ref2.exact;
                return _react2.default.createElement(_reactRouterDom.Route, { key: Math.random() + 'ROUTE_', exact: exact, path: path, component: component });
            });
            var redirects = _routes2.default.redirects.map(function (_ref3, i) {
                var from = _ref3.from,
                    to = _ref3.to,
                    status = _ref3.status;
                return _react2.default.createElement(_redirectWStatus2.default, { key: Math.random() + 'REDIRECT_', from: from, to: to, status: status });
            });
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_navbar2.default, null),
                _react2.default.createElement(
                    _reactRouterDom.Switch,
                    null,
                    proutes,
                    routes,
                    redirects
                )
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var customMiddleware = function customMiddleware(store) {
    return function (next) {
        return function (action) {
            return isFunction(action) ? action(store.dispatch, store.getState) : next(action);
        };
    };
};
var isFunction = function isFunction(action) {
    return typeof action === 'function';
};
exports.default = customMiddleware;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(1);

var _userReducer = __webpack_require__(31);

var _userReducer2 = _interopRequireDefault(_userReducer);

var _loginReducer = __webpack_require__(30);

var _loginReducer2 = _interopRequireDefault(_loginReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
    user: _userReducer2.default,
    userAuth: _loginReducer2.default
});

exports.default = reducers;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(18);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _path2 = __webpack_require__(19);

var _path3 = _interopRequireDefault(_path2);

var _server = __webpack_require__(21);

var _server2 = _interopRequireDefault(_server);

var _reactHelmet = __webpack_require__(8);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _app = __webpack_require__(14);

var _app2 = _interopRequireDefault(_app);

var _reactDom = __webpack_require__(20);

var _reactRedux = __webpack_require__(3);

var _redux = __webpack_require__(1);

var _combine = __webpack_require__(16);

var _combine2 = _interopRequireDefault(_combine);

var _reactRouter = __webpack_require__(22);

var _thunk = __webpack_require__(15);

var _thunk2 = _interopRequireDefault(_thunk);

var _routes = __webpack_require__(10);

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = __webpack_require__(17);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


app.use('/dist', _express2.default.static('dist'));
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(_bodyParser2.default.json());

app.post('/regis', function (req, res, next) {
	if (!req.body) return res.sendStatus(400);

	var newUser = { profile: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			login: req.body.email
		},
		credentials: {
			password: {
				value: req.body.password
			}
		} };
	return client.createUser(newUser).then(function (user) {
		res.status(201);
		res.json(user);
		// console.log(user)
	}).catch(function (err) {
		res.status(400);
		res.send(err);
	});
});
app.get('*', async function (req, res) {
	try {
		//create new redux store on each request
		var store = (0, _redux.createStore)(_combine2.default, {}, (0, _redux.applyMiddleware)(_thunk2.default));
		var foundPath = null;
		// match request url to our React Router paths and grab component

		var _ref = _routes2.default.routes.find(function (_ref2) {
			var path = _ref2.path,
			    exact = _ref2.exact;

			foundPath = (0, _reactRouter.matchPath)(req.url, {
				path: path,
				exact: exact,
				strict: false
			});
			return foundPath;
		}) || {},
		    _path = _ref.path,
		    component = _ref.component;
		// safety check for valid component, if no component we initialize an empty shell.


		if (!component) component = {};
		// safety check for fetchData function, if no function we give it an empty promise
		if (!component.fetchData) component.fetchData = function () {
			return new Promise(function (resolve) {
				return resolve();
			});
		};
		// meat and bones of our isomorphic application: grabbing async data
		await component.fetchData({ store: store, params: foundPath ? foundPath.params : {} });
		//get store state (js object of entire store)
		var preloadedState = store.getState();
		//context is used by react router, empty by default
		var context = {};
		var html = _server2.default.renderToString(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(
				_reactRouter.StaticRouter,
				{ context: context, location: req.url },
				_react2.default.createElement(_app2.default, null)
			)
		));
		//render helmet data aka meta data in <head></head>
		var helmetData = _reactHelmet2.default.renderStatic();
		//check context for url, if url exists then react router has ran into a redirect
		if (context.url)
			//process redirect through express by redirecting
			res.redirect(context.status, 'http://' + req.headers.host + context.url);else if (foundPath && foundPath.path == '/404')
			//if 404 then send our custom 404 page with initial state and meta data, this is needed for status code 404
			res.status(404).send(renderFullPage(html, preloadedState, helmetData));else
			//else send down page with initial state and meta data
			res.send(renderFullPage(html, preloadedState, helmetData));
	} catch (error) {
		res.status(400).send(renderFullPage('An error occured.', {}, {}));
	}
});

var port = process.env.PORT || 9000;
app.listen(port, function () {
	console.log('app running on localhost:' + port);
});

function renderFullPage(html, preloadedState, helmet) {
	return '\n    <!doctype html>\n    <html>\n\t\t\t<head>\n\t\t\t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous" />\n\t\t\t' + helmet.title.toString() + '\n\t\t\t' + helmet.meta.toString() + '\n\t\t\t' + helmet.link.toString() + '\n\t\t\t<script type="text/javascript">\n\t\t\t\twindow.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + ';\n\t\t\t</script>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script src="/dist/assets/app.bundle.js"></script>\n\t\t\t\t</body>\n    </html>\n    ';
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FourOFour = function (_Component) {
    _inherits(FourOFour, _Component);

    function FourOFour() {
        _classCallCheck(this, FourOFour);

        return _possibleConstructorReturn(this, (FourOFour.__proto__ || Object.getPrototypeOf(FourOFour)).apply(this, arguments));
    }

    _createClass(FourOFour, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                '404; page not found'
            );
        }
    }], [{
        key: 'fetchData',
        value: function fetchData() {
            return new Promise(function (resolve, reject) {
                return resolve();
            });
        }
    }]);

    return FourOFour;
}(_react.Component);

exports.default = FourOFour;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _oktaAuthJs = __webpack_require__(6);

var _oktaAuthJs2 = _interopRequireDefault(_oktaAuthJs);

var _oktaReact = __webpack_require__(2);

var _redux = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _loginAction = __webpack_require__(5);

var actions = _interopRequireWildcard(_loginAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForgetPass = function (_React$Component) {
  _inherits(ForgetPass, _React$Component);

  function ForgetPass(props) {
    _classCallCheck(this, ForgetPass);

    var _this = _possibleConstructorReturn(this, (ForgetPass.__proto__ || Object.getPrototypeOf(ForgetPass)).call(this, props));

    _this.state = {
      confirm: "",
      password: "",
      sessionToken: null
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleConfirmChange = _this.handleConfirmChange.bind(_this);
    _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
    return _this;
  }

  _createClass(ForgetPass, [{
    key: "handleConfirmChange",
    value: function handleConfirmChange(e) {
      this.setState({ confirm: e.target.value });
    }
  }, {
    key: "handlePasswordChange",
    value: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var _state = this.state,
          confirm = _state.confirm,
          password = _state.password;

      var url = this.props.auth._config.baseUrl;
      if (confirm === password) {
        // this.props.register(firstName, lastName, email, password, url);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return _react2.default.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        _react2.default.createElement(
          "div",
          { className: "form-element" },
          _react2.default.createElement(
            "label",
            null,
            "Password:"
          ),
          _react2.default.createElement("input", {
            type: "password",
            id: "password",
            value: this.state.password,
            onChange: this.handlePasswordChange
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "form-element" },
          _react2.default.createElement(
            "label",
            null,
            "Confirm Password:"
          ),
          _react2.default.createElement("input", {
            type: "password",
            id: "password",
            value: this.state.confirm,
            onChange: this.handleConfirmChange
          })
        ),
        _react2.default.createElement("input", { type: "submit", id: "submit", value: "Register" })
      );
    }
  }]);

  return ForgetPass;
}(_react2.default.Component);

function mapStateToProps(state) {
  return _extends({}, state);
}
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _oktaReact.withAuth)(ForgetPass));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(8);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactHelmet.Helmet,
                    null,
                    _react2.default.createElement('meta', { charSet: 'utf-8' }),
                    _react2.default.createElement(
                        'title',
                        null,
                        'Home'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col align-self-center' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-primary btn-lg btn-block', onClick: function onClick() {
                                        return _this2.props.auth.logout();
                                    } },
                                ' logout '
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redirectWStatus = __webpack_require__(9);

var _redirectWStatus2 = _interopRequireDefault(_redirectWStatus);

var _oktaReact = __webpack_require__(2);

var _loginform = __webpack_require__(7);

var _loginform2 = _interopRequireDefault(_loginform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImplicitCallback = function (_Component) {
  _inherits(ImplicitCallback, _Component);

  function ImplicitCallback(props) {
    _classCallCheck(this, ImplicitCallback);

    var _this = _possibleConstructorReturn(this, (ImplicitCallback.__proto__ || Object.getPrototypeOf(ImplicitCallback)).call(this, props));

    console.log(props);

    _this.state = {
      authenticated: null,
      error: null
    };
    _this.handleAuth();
    return _this;
  }

  _createClass(ImplicitCallback, [{
    key: "handleAuth",
    value: async function handleAuth() {
      try {
        var tokens = await this.props.auth._oktaAuth.token.parseFromUrl();
        tokens = Array.isArray(tokens) ? tokens : [tokens];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var token = _step.value;

            if (token.idToken) {
              this.props.auth._oktaAuth.tokenManager.add("idToken", token);
            } else if (token.accessToken) {
              this.props.auth._oktaAuth.tokenManager.add("accessToken", token);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.props.auth._history.push('/');
        console.log(this.props);
      } catch (e) {
        this.props.auth._history.push("/login");
      }
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.props);
      if (this.state.authenticated === null) {
        return null;
      }

      var referrerKey = "secureRouterReferrerPath";
      var pathname = localStorage.getItem(referrerKey) || "/";
      localStorage.removeItem(referrerKey);

      return _react2.default.createElement(
        "div",
        null,
        "Hello from /ImplicitCallback"
      );
    }
  }]);

  return ImplicitCallback;
}(_react.Component);

;

exports.default = (0, _oktaReact.withAuth)(ImplicitCallback);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _loginform = __webpack_require__(7);

var _loginform2 = _interopRequireDefault(_loginform);

var _redirectWStatus = __webpack_require__(9);

var _redirectWStatus2 = _interopRequireDefault(_redirectWStatus);

var _oktaReact = __webpack_require__(2);

var _redux = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _loginAction = __webpack_require__(5);

var actions = _interopRequireWildcard(_loginAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  _createClass(Login, null, [{
    key: "fetchData",
    value: function fetchData(_ref) {
      var store = _ref.store;

      return store.getState(); //default
    }
  }]);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = { authenticated: null };
    _this.checkAuthentication = _this.checkAuthentication.bind(_this);
    _this.checkAuthentication();
    return _this;
  }

  _createClass(Login, [{
    key: "checkAuthentication",
    value: async function checkAuthentication() {

      try {
        var authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated: authenticated });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkAuthentication();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.authenticated === null) return null;
      return this.state.authenticated ? _react2.default.createElement(_redirectWStatus2.default, {
        key: Math.random() + "REDIRECT_",
        from: "/login",
        to: "/user",
        status: 301
      }) : _react2.default.createElement(_loginform2.default, null);
    }
  }]);

  return Login;
}(_react.Component);

;

function mapStateToProps(state) {
  return _extends({}, state);
}
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _oktaReact.withAuth)(Login));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getName = getName;

var _userTypes = __webpack_require__(13);

var _axios = __webpack_require__(35);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getName(user) {
    return async function (dispatch, getState) {
        // let {data} = await getUserFromAPI(id);
        dispatch({ type: _userTypes.Types.UPDATE_NAME, payload: user });
    };
}
// function getUserFromAPI(id) {
//     return Request.get(`https://jsonplaceholder.typicode.com/users/${id}`);
// }

// function getUserFromAuth(){

// }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = loginReducer;

var _loginTypes = __webpack_require__(12);

var initialState = {
    firstName: null,
    lastName: null,
    login: null,
    sessionToken: null,
    expiresAt: null,
    email: null
};
function loginReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _loginTypes.Types.LOGIN_SUCCESS:
            return _extends({}, state, { login: action.profile._embedded.user.profile.login,
                firstName: action.profile._embedded.user.profile.firstName,
                lastName: action.profile._embedded.user.profile.lastName,
                sessionToken: action.profile.sessionToken,
                expiresAt: action.profile.expiresAt });
        default:
            return state;
    }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = userReducer;

var _userTypes = __webpack_require__(13);

var initialState = {
    firstName: null,
    lastName: null,
    login: null,
    sessionToken: null,
    expiresAt: null,
    email: null
};
function userReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _userTypes.Types.UPDATE_NAME:
            return _extends({}, state, { name: action.payload.name, email: action.payload.email });
        default:
            return state;
    }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _oktaAuthJs = __webpack_require__(6);

var _oktaAuthJs2 = _interopRequireDefault(_oktaAuthJs);

var _oktaReact = __webpack_require__(2);

var _redux = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _loginAction = __webpack_require__(5);

var actions = _interopRequireWildcard(_loginAction);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterForm = function (_React$Component) {
  _inherits(RegisterForm, _React$Component);

  // static fetchData({ store }) {
  //   return store.getState(); //default
  // }
  function RegisterForm(props) {
    _classCallCheck(this, RegisterForm);

    var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

    _this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sessionToken: null
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleFirstNameChange = _this.handleFirstNameChange.bind(_this);
    _this.handleLastNameChange = _this.handleLastNameChange.bind(_this);
    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
    _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
    return _this;
  }

  _createClass(RegisterForm, [{
    key: 'handleFirstNameChange',
    value: function handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
  }, {
    key: 'handleLastNameChange',
    value: function handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
    }
  }, {
    key: 'handleEmailChange',
    value: function handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
  }, {
    key: 'handlePasswordChange',
    value: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var _state = this.state,
          firstName = _state.firstName,
          lastName = _state.lastName,
          email = _state.email,
          password = _state.password;

      var url = this.props.auth._config.baseUrl;
      if (email && password) {
        this.props.register(firstName, lastName, email, password, url);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.userAuth.sessionToken) {
        try {
          this.props.auth.redirect({
            sessionToken: this.props.userAuth.sessionToken
          });
          console.log("yeah");
          return null;
        } catch (e) {
          console.log(e);
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col align-self-center' },
            _react2.default.createElement(
              'form',
              { onSubmit: this.handleSubmit },
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'email' },
                  'Email:'
                ),
                _react2.default.createElement('input', {
                  className: 'form-control',
                  type: 'email',
                  id: 'email',
                  value: this.state.email,
                  onChange: this.handleEmailChange
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'firstName' },
                  'First Name:'
                ),
                _react2.default.createElement('input', {
                  className: 'form-control',
                  type: 'text',
                  id: 'firstName',
                  value: this.state.firstName,
                  onChange: this.handleFirstNameChange
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'lastName' },
                  'Last Name:'
                ),
                _react2.default.createElement('input', {
                  className: 'form-control',
                  type: 'text',
                  id: 'lastName',
                  value: this.state.lastName,
                  onChange: this.handleLastNameChange
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'password' },
                  'Password:'
                ),
                _react2.default.createElement('input', {
                  className: 'form-control',
                  'aria-describedby': 'passswordHelp',
                  type: 'password',
                  id: 'password',
                  value: this.state.password,
                  onChange: this.handlePasswordChange
                }),
                _react2.default.createElement(
                  'small',
                  { id: 'passwordHelp' },
                  '**Password must contain an Uppercase, a lowercase and a number. It should be up to 6 characters'
                )
              ),
              _react2.default.createElement('input', {
                type: 'submit',
                id: 'submit',
                value: 'Register',
                className: 'btn btn-primary'
              })
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
              'p',
              null,
              'If you have an account, click here to login'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/login' },
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-secondary btn-lg btn-block' },
                'Login'
              )
            )
          )
        )
      );
    }
  }]);

  return RegisterForm;
}(_react2.default.Component);

;

function mapStateToProps(state) {
  return _extends({}, state);
}
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _oktaReact.withAuth)(RegisterForm));

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _oktaAuthJs = __webpack_require__(6);

var _oktaAuthJs2 = _interopRequireDefault(_oktaAuthJs);

var _oktaReact = __webpack_require__(2);

var _redux = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _loginAction = __webpack_require__(5);

var actions = _interopRequireWildcard(_loginAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetPass = function (_React$Component) {
  _inherits(ResetPass, _React$Component);

  function ResetPass(props) {
    _classCallCheck(this, ResetPass);

    var _this = _possibleConstructorReturn(this, (ResetPass.__proto__ || Object.getPrototypeOf(ResetPass)).call(this, props));

    _this.state = {
      confirm: "",
      password: "",
      sessionToken: null
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleConfirmChange = _this.handleConfirmChange.bind(_this);
    _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
    return _this;
  }

  _createClass(ResetPass, [{
    key: "handleConfirmChange",
    value: function handleConfirmChange(e) {
      this.setState({ confirm: e.target.value });
    }
  }, {
    key: "handlePasswordChange",
    value: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var _state = this.state,
          confirm = _state.confirm,
          password = _state.password;

      var url = this.props.auth._config.baseUrl;
      if (confirm === password) {
        // this.props.register(firstName, lastName, email, password, url);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return _react2.default.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        _react2.default.createElement(
          "div",
          { className: "form-element" },
          _react2.default.createElement(
            "label",
            null,
            "Password:"
          ),
          _react2.default.createElement("input", { type: "password", id: "password", value: this.state.password, onChange: this.handlePasswordChange })
        ),
        _react2.default.createElement(
          "div",
          { className: "form-element" },
          _react2.default.createElement(
            "label",
            null,
            "Confirm Password:"
          ),
          _react2.default.createElement("input", { type: "password", id: "password", value: this.state.confirm, onChange: this.handleConfirmChange })
        ),
        _react2.default.createElement("input", { type: "submit", id: "submit", value: "Register" })
      );
    }
  }]);

  return ResetPass;
}(_react2.default.Component);

function mapStateToProps(state) {
  return _extends({}, state);
}
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _oktaReact.withAuth)(ResetPass));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(3);

var _redux = __webpack_require__(1);

var _reactHelmet = __webpack_require__(8);

var _userActions = __webpack_require__(29);

var actions = _interopRequireWildcard(_userActions);

var _oktaReact = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Component) {
  _inherits(User, _Component);

  _createClass(User, null, [{
    key: 'fetchData',
    value: function fetchData(_ref) {
      var store = _ref.store;

      return store.dispatch(actions.getName());
    }
  }]);

  function User(props) {
    _classCallCheck(this, User);

    var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));

    _this.state = { user: null };
    _this.getCurrentUser = _this.getCurrentUser.bind(_this);
    return _this;
  }

  _createClass(User, [{
    key: 'getCurrentUser',
    value: async function getCurrentUser() {
      var _this2 = this;

      this.props.auth.getUser().then(function (user) {
        return _this2.props.getName(user);
      }).then(function (user) {
        return console.log(user);
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getCurrentUser();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log(this.props);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet.Helmet,
          null,
          _react2.default.createElement('meta', { charSet: 'utf-8' }),
          _react2.default.createElement(
            'title',
            null,
            'User'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col align-self-center' },
              _react2.default.createElement(
                'strong',
                null,
                'User page '
              ),
              _react2.default.createElement(
                'div',
                null,
                'Login in as',
                _react2.default.createElement(
                  'p',
                  null,
                  ' name: ',
                  this.props.user.name,
                  ' '
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  ' email: ',
                  this.props.user.email
                )
              ),
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-primary btn-lg btn-block', onClick: function onClick() {
                    return _this3.props.auth.logout();
                  } },
                'Sign out'
              )
            )
          )
        )
      );
    }
  }]);

  return User;
}(_react.Component);

function mapStateToProps(state) {
  return _extends({}, state);
}
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _oktaReact.withAuth)(User));

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map