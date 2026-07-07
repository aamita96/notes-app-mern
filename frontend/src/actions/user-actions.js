import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/user-constants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("/api/users/login", { email, password }, config);


        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error?.response?.data || error.message
        });
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password, pic) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const userData = {
            name,
            email,
            password,
            pic
        };

        const { data } = await axios.post("/api/users/register", userData, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data ? error.response.data : error.message
        });

    }
}

export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const userData = {
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic
        };

        const { data } = await axios.post("/api/users/profile", userData, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data ? error.response.data : error.message
        });
    }
}