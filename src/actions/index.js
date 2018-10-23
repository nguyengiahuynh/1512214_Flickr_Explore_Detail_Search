import * as types from './../containers/actionTypes';

export const addPhotos = (photo) => {
	return {
		type: types.ADD_PHOTOS,
		photos: photo.photos,
		nextPage: photo.nextPage
	}
}

export const clearPhotos = () => {
	return {
		type: types.CLEAR_PHOTOS
	}
}

export const updateTags = (tag) => {
	return {
		type: types.UPDATE_TAGS,
		tag
	}
}