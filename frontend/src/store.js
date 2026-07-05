import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/user-reducers';
import { notesCreateReducer, notesDeleteReducer, notesListReducer, notesUpdateReducer } from './reducers/note-reducers';

const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const preloadedState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
};

const store = configureStore({
    reducer: {
        // User Reducers
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userUpdate: userUpdateReducer,
        // Notes Reducers
        notesList: notesListReducer,
        noteCreate: notesCreateReducer,
        noteUpdate: notesUpdateReducer,
        noteDelete: notesDeleteReducer
    },
    preloadedState
});

export default store;