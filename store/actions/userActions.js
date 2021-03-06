import {
  login,
  setFcmTokenApi,
  signup,
  updateProfile,
  updateProfileImage,
  resetPassword,
  verifyResetPassword,
  checkEmail,
  checkUsername,
} from '../../utils/api';

export const setUserAction = data => async dispatch => {
  dispatch({ type: 'SET_USER', payload: data });
};

export const loginAction = (username, password) => async dispatch => {
  return new Promise((resolve, reject) =>
    login(username.trim(), password.trim())
      .then(({ payload }) => {
        dispatch({ type: 'LOGIN', payload: { ...payload.user } });
        resolve(payload);
      })
      .catch(({ error }) => {
        reject(error);
      })
  );
};

export const checkEmailACtion = email => dispatch => {
  return checkEmail(email);
};

export const checkUsernameAction = username => dispatch => {
  return checkUsername(username);
};

// export const signupAction = (name, email, username, password) => async dispatch => {
//   return new Promise((resolve, reject) =>
//     signup(name.trim(), email.trim(), username.trim(), password.trim())
//       .then(({ payload }) => {
//         dispatch({ type: 'SIGNUP', payload: { ...payload.user } });
//         resolve(payload);
//       })
//       .catch(({ error }) => reject(error))
//   );
// };

export const signupAction = (email, username, password) => async dispatch => {
  return new Promise((resolve, reject) =>
    signup(email.trim(), username.trim(), password.trim())
      .then(({ data }) => {
        dispatch({ type: 'SIGNUP', payload: { ...data.payload.user } });
        resolve(data.payload);
      })
      .catch(error => reject(error))
  );
};

export const logoutAction = () => dispatch => dispatch({ type: 'LOGOUT' });

export const setFcmTokenAction = (_id, fcmToken) => dispatch => {
  dispatch({ type: 'SET_FCM_TOKEN', payload: fcmToken });
  setFcmTokenApi(_id, fcmToken);
};

export const updateProfileAction = data => async (dispatch, getState) => {
  const state = getState();
  const { username, token } = state.user.user;

  return new Promise((resolve, reject) =>
    updateProfile(username, data, token)
      .then(res => {
        dispatch({ type: 'SET_USER', payload: { ...res.data.payload } });
        resolve();
      })
      .catch(error => {
        console.log('Errore durante updateProfileAction:', error);
        reject(error);
      })
  );
};

export const updateProfileImageAction = data => (dispatch, getState) => {
  const state = getState();
  const { username, token } = state.user.user;

  return new Promise((resolve, reject) =>
    updateProfileImage(username, data, token)
      .then(err => {
        dispatch({ type: 'SET_USER', payload: { ...err.data.payload } });
        resolve(err.data.payload);
      })
      .catch(err => reject(err))
  );
};

export const resetPasswordAction = email => async dispatch => {
  try {
    const res = await resetPassword(email);
    return res;
  } catch (error) {
    console.log('ResetPasswordAction:', error);
    return error;
  }
};

export const verifyResetPasswordAction = data => async dispatch => {
  try {
    const res = await verifyResetPassword(data);
    console.log(res.data.user);
    dispatch({ type: 'SET_USER', payload: { ...res.data.user } });
    dispatch({ type: 'SET_FCM_TOKEN', payload: res.data.fcmToken });
    return res;
  } catch (error) {
    console.log('VerifyResetPasswordAction:', error);
    return error;
  }
};

export const exitAppAction = () => dispatch => {
  console.log('Uscito');
};
