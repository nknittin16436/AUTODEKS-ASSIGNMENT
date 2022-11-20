import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  All_USERS_REQUEST,
  All_USERS_SUCCESS,
  All_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERRORS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GOOGLE_USER_REQUEST,
  GOOGLE_USER_FAIL,
  GOOGLE_USER_SUCCESS
} from '../constants/userConstant'
import axios from "axios";
const url = "http://localhost:5000";
// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${url}/users/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem("autodesk", data.accessToken)
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};


//REGISTER
export const register = (name, email, phone, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${url}/users/signup`,
      { name, email, phone, password },
      config
    );
    console.log(data)
    dispatch({ type: REGISTER_USER_SUCCESS });
    return true;
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
  }
};
//REGISTER
export const addNewUser = (name, email, phone, password) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${url}/users/signup`,
      { name, email, phone, password },
      config
    );
    console.log(data)
    dispatch({ type: ADD_USER_SUCCESS, payload: data });
    return true;
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error.response.data.message });
  }
};




// Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('autodesk');

  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`${url}/users/user/${token}`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    localStorage.removeItem('autodesk')
  }
};


export const getAllUsers = (page) => async (dispatch) => {
  const token = localStorage.getItem('autodesk');
  try {
    dispatch({ type: All_USERS_REQUEST });
    const { data } = await axios.get(`${url}/users?page=${page}`, {
      headers: {
        authtoken: token
      }
    });
    console.log(data)
    dispatch({ type: All_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: All_USERS_FAIL, payload: error.response.data.message });
  }
};


export const updateUser = (userId, userData) => async (dispatch) => {
  const token = localStorage.getItem('autodesk');

  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const { data } = await axios.patch(`${url}/users/${userId}`, userData, {
      headers: {
        authtoken: token
      }
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  const token = localStorage.getItem('autodesk');

  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(`${url}/users/${userId}`, {
      headers: {
        authtoken: token
      }
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
  }
};



// LoGOUT User
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem('autodesk')
  } catch (error) {
    console.log(error);
  }
};


export const loginGoogleUser = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${url}/users/login/google`,
      { name, email },
      config
    );
    console.log(data)
    dispatch({ type: GOOGLE_USER_SUCCESS, payload: data.user });
    localStorage.setItem("autodesk", data.accessToken)
  } catch (error) {
    console.log(error)
    dispatch({ type: GOOGLE_USER_FAIL, payload: error.response.data.message });
  }
};

//CLEARING ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
