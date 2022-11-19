import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, userReducer } from "./reducer/userReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        users:allUsersReducer,
    }
});

export default store;