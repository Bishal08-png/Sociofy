import * as UploadApi from '../api/UploadRequest'

// Returns the Cloudinary URL string, or null on failure
export const uploadImage = (data) => async (dispatch) => {
    try {
        const response = await UploadApi.uploadImage(data);
        // Server returns { url: 'https://res.cloudinary.com/...' }
        return response.data?.url || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' })
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({ type: 'UPLOAD_SUCCESS', data: newPost.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'UPLOAD_FAIL' })
    }
}