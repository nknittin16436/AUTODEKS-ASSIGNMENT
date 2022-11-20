import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    All_USERS_REQUEST,
    All_USERS_SUCCESS,
    All_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CLEAR_ERRORS,
    ADD_USER_FAIL,
    ADD_USER_RESET,
    ADD_USER_SUCCESS,
    ADD_USER_REQUEST,
    GOOGLE_USER_REQUEST,
    GOOGLE_USER_SUCCESS,
    GOOGLE_USER_FAIL
} from '../constants/userConstant'


// for account /me section

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case GOOGLE_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case GOOGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case GOOGLE_USER_FAIL:

            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }


        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};




//for edit profile
export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }

        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAdded: action.payload.success
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            }

        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case ADD_USER_RESET:
            return {
                ...state,
                isAdded: false
            }

        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
        case ADD_USER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case All_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case All_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                totalUsers: action.payload.totalUsers
            }

        case All_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
