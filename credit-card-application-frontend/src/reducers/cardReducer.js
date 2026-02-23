import { SUBMIT_REQUEST, SUBMIT_SUCCESS, SUBMIT_FAILURE } from '../actions/types';

const initialState = {
    loading: false,
    applicationData: null,
    error: null,
    isSuccess: false
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_REQUEST:
            return { ...state, loading: true };
        case SUBMIT_SUCCESS:
            return { ...state, loading: false, isSuccess: true, applicationData: action.payload };
        case SUBMIT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default cardReducer;