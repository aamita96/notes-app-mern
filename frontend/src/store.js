import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './reducers/user-reducers';

const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const preloadedState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
};

const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer
    },
    preloadedState
});

export default store;