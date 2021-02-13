/* eslint-disabled */
import axios from 'axios';
import { showAlert } from './alert';

export const sendText = async (userID, otp) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/messages/sendMessage',
      data: {
        userID,
        otp,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', res.data.message);
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response.data.status === 'failed') {
      showAlert('error', err.response.data.message);
      setTimeout(() => {
        location.assign('/');
      }, 2500);
    }
  }
};
