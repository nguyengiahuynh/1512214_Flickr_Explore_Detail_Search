import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './photo.css'
import Explore from './explore';
import Photo from './photo';
import Search from './search'
import {
BrowserRouter,
Route,
Link
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
	<div>
	<Route exact path="/explore" component={Explore} />
	<Route exact path="/" component={Explore} />
	<Route exact path="/photo/:id" component={Photo} />
	<Route exact path="/photo/tags/:tag" component={Search} />
	</div>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
