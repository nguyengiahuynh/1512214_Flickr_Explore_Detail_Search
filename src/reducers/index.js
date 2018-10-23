import {combineReducers} from 'redux';
import addPhotosReducer from './addPhotosReducer' 
import clearPhotosReducer from './clearPhotosReducer'
import updateTagsReducer from './updateTagsReducer'

const myReducer = combineReducers({
	addPhotosReducer,
	clearPhotosReducer,
	updateTagsReducer
});

export default myReducer;