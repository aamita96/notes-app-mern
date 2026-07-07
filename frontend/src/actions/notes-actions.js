import axios from "axios";
import {
    NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS,
    NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS,
    NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS, NOTES_UPDATE_FAIL,
    NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_DELETE_FAIL,
} from "../constants/note-constants";

export const listNoteAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get('/api/notes', config);

        dispatch({ type: NOTES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: NOTES_LIST_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const createNoteAction = (title, category, content) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_CREATE_REQUEST });
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post('/api/notes/create', { title, category, content }, config);

        dispatch({ type: NOTES_CREATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: NOTES_CREATE_FAIL,
            error: error.response && error.response.data ? error.response.data : error.message
        })
    }
}

export const updateNoteAction = (id, title, category, content) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_UPDATE_REQUEST });
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/notes/${id}`, { title, category, content }, config);
        dispatch({ type: NOTES_UPDATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: NOTES_UPDATE_FAIL,
            error: error.response && error.response.data ? error.response.data : error.message
        })
    }
}

export const deleteNoteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_DELETE_REQUEST });
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`/api/notes/${id}`, config);

        dispatch({
            type: NOTES_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NOTES_DELETE_FAIL,
            error: error.response && error.response.data ? error.response.data : error.message
        });
    }
}