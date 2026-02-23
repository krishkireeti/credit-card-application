import api from '../api/api';
import { SUBMIT_REQUEST, SUBMIT_SUCCESS, SUBMIT_FAILURE } from './types';

export const applyForCard = (formData) => {
    return async (dispatch) => {
        dispatch({ type: SUBMIT_REQUEST });
        try {
            const response = await api.post('/applications', formData);
            dispatch({ type: SUBMIT_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: SUBMIT_FAILURE, payload: error.message });
        }
    };
};