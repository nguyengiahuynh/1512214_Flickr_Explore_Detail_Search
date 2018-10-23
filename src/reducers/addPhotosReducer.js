import * as types from './../containers/actionTypes'

var myReducer = (state = {photos: [], nextPage: 1}, action) => {
	if (action.type === types.ADD_PHOTOS)
	{
		return {
			...state,
			photos: [...state.photos, ...action.photos],
			nextPage: action.nextPage
		}
	}
	return state;
}

export default myReducer;