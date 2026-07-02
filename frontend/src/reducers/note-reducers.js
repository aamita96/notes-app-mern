import {
    NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS,
    NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS,
    NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS, NOTES_UPDATE_FAIL,
    NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_DELETE_FAIL
} from "../constants/note-constants";

export const notesListReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTES_LIST_REQUEST:
            return { ...state, loading: true, error: false };
            break;
        case NOTES_LIST_SUCCESS:
            return { ...state, loading: false, notes: action.payload };
            break;
        case NOTES_LIST_FAIL:
            return { loading: false, error: action.payload };
            break;

        default:
            return state;
    }
}

export const notesCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTES_CREATE_REQUEST:
            return { ...state, loading: true, error: false };
            break;
        case NOTES_CREATE_SUCCESS:
            return { ...state, loading: false, success: true };
            break;
        case NOTES_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };
            break;

        default:
            return state;
    }
}

export const notesUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTES_UPDATE_REQUEST:
            return { ...state, loading: true, error: false };
            break;
        case NOTES_UPDATE_SUCCESS:
            return { ...state, loading: false, success: true };
            break;
        case NOTES_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };
            break;

        default:
            return state;
    }
}

export const notesDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTES_DELETE_REQUEST:
            return { ...state, loading: true, error: false };
            break;
        case NOTES_DELETE_SUCCESS:
            return { ...state, loading: false, success: true, error: false };
            break;
        case NOTES_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };

        default:
            return state;
    }
}