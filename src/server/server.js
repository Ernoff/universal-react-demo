import express from 'express';
import React from 'react';
import path from 'path';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import App from '../shared/app/app.jsx';
const app = express();
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../shared/app/redux/reducers/combine';
import { StaticRouter as Router, matchPath } from 'react-router';
import thunk from '../shared/app/redux/middleware/thunk';
import routeBank from '../shared/routes/routes';
import bodyParser from 'body-parser';

app.use('/dist', express.static('dist'));
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.post('/regis', (req, res, next) => {
	if(!req.body) return res.sendStatus(400);

	const newUser =
   { profile: { 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email 
    },
  credentials:{
    password:{
			value: req.body.password
		}
	}};
return client.createUser(newUser)
	.then(user => {
		res.status(201);
		 res.json(user);
		// console.log(user)
	})
	.catch(err => {
		res.status(400);
		res.send(err)
	})
});
app.get('*', async (req, res) => {
	try {
		//create new redux store on each request
		const store = createStore(reducers, {}, applyMiddleware(thunk));
		let foundPath = null;
		// match request url to our React Router paths and grab component
		let { path, component } = routeBank.routes.find(
			({ path, exact }) => {
				foundPath = matchPath(req.url,
					{
						path,
						exact,
						strict: false
					}
				)
				return foundPath;
			}) || {};
		// safety check for valid component, if no component we initialize an empty shell.
		if (!component)
			component = {};
		// safety check for fetchData function, if no function we give it an empty promise
		if (!component.fetchData)
			component.fetchData = () => new Promise(resolve => resolve());
		// meat and bones of our isomorphic application: grabbing async data
		await component.fetchData({ store, params: (foundPath ? foundPath.params : {}) });
		//get store state (js object of entire store)
		let preloadedState = store.getState();
		//context is used by react router, empty by default
		let context = {};
		const html = ReactDOM.renderToString(
			<Provider store={store}>
				<Router context={context} location={req.url}>
					<App /> 
				</Router>
			</Provider>
		)
		//render helmet data aka meta data in <head></head>
		const helmetData = helmet.renderStatic();
		//check context for url, if url exists then react router has ran into a redirect
		if (context.url)
			//process redirect through express by redirecting
			res.redirect(context.status, 'http://' + req.headers.host + context.url);
		else if (foundPath && foundPath.path == '/404')
			//if 404 then send our custom 404 page with initial state and meta data, this is needed for status code 404
			res.status(404).send(renderFullPage(html, preloadedState, helmetData))
		else
			//else send down page with initial state and meta data
			res.send(renderFullPage(html, preloadedState, helmetData))
	} catch (error) {
		res.status(400).send(renderFullPage('An error occured.', {}, {}));
	}
});

const port = process.env.PORT || 9000;
app.listen(port, function () {
	console.log('app running on localhost:' + port);
});

function renderFullPage(html, preloadedState, helmet) {
	return `
    <!doctype html>
    <html>
			<head>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous" />
			${helmet.title.toString()}
			${helmet.meta.toString()}
			${helmet.link.toString()}
			<script type="text/javascript">
				window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")};
			</script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/dist/assets/app.bundle.js"></script>
				</body>
    </html>
    `;
}