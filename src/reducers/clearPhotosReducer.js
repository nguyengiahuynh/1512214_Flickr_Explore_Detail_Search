import * as types from './../containers/actionTypes'

var myReducer = (state = {photos: [], nextPage: 1}, action) => {
	if (action.type === types.CLEAR_PHOTOS)
	{
		return {
			...state,
			photos: []
		}
	}
	return state;
}

export default myReducer;