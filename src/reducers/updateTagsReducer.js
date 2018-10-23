import * as types from './../containers/actionTypes'

var myReducer = (state = {}, action) => {
	if (action.type === types.UPDATE_TAGS)
	{
		return {
			tag: action.tag
		}
	}
	return state;
}

export default myReducer;