import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, profileReducer, userReducer } from "./reducer/userReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        users:allUsersReducer,
        profile:profileReducer
    }
});

export default store;