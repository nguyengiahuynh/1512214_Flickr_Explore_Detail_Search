import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './photo.css'
import Explore from './explore';
import Photo from './photo';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import myReducer from './reducers/index';
import Search from './search'
import {
BrowserRouter,
Route,
Link
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(myReducer);

ReactDOM.render(
	<Provider store={store}>
	<BrowserRouter>
	<div>
	<Route exact path="/explore" component={Explore} />
	<Route exact path="/" component={Explore} />
	<Route exact path="/photo/:id" component={Photo} />
	<Route exact path="/photo/tags/:tag" component={Search} />
	</div>
	</BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
