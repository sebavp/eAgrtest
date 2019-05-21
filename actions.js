import axios from 'axios';
import { NetInfo } from "react-native";
const URL = 'https://webhook.site/0dd17468-c2de-4a69-b792-05fab38f74e8';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const receiveMessage = response => ({
  message: response.data,
  type: RECEIVE_MESSAGE
})

const sentMessage = (message, success) => ({
  message,
  sentSuccess: success,
  type: SEND_MESSAGE
})

export const loadMessage = () => {
  return dispatch => {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if(connectionInfo.type !== 'none'){
        axios.get(URL).then(response =>
          dispatch(receiveMessage(response))
        ).catch(e => console.log(e));
      } else {
        return {};
      }
    });
  }
}

export const sendMessage = message => {
  return dispatch => {
    axios.post(URL, { data: message }).then(response => {
      dispatch(sentMessage(message, true));
    }).catch(e => {
      dispatch(sentMessage(message, false));
      dispatch(sendMessage(message));
    });
  }
}
