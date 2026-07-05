import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/user-constants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
            break;
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
            break;
        case USER_LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload };
            break;
        case USER_LOGOUT:
            return { loading: false, error: null, userInfo: null };
            break;

        default:
            return state;
            break;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
            break;
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
            break;
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.payload };
            break;

        default:
            return state;
            break;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { ...state, loading: true, error: null };
            break;
        case USER_UPDATE_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, success: true, error: null };
            break;
        case USER_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };
            break;
        default:
            return state;
    }
}