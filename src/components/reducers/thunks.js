import axios from "axios";
import { authenticatingUser, authenticateUserFailure, authenticateUserSuccess } from "../actions/cartActions"
import { URL_AUTHENTICATION } from "../config";

export const authenticateUser = (username, password) => async dispatch => {
  try {
    console.log('authenticatingUser');
    dispatch(authenticatingUser());
    axios.post(
      URL_AUTHENTICATION,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(res => {
        console.log('res', res);
        const { status, id_token: token } = res.data;
        if (status === 'success') {
          dispatch(authenticateUserSuccess(username, token));
        } else {
          dispatch(authenticateUserFailure());
        }
    })
  } catch (e) {
    dispatch(authenticateUserFailure());
  }
}