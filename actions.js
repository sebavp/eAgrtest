import axios from 'axios';
const URL = 'https://webhook.site/7c0bfee3-69db-48b4-8845-1e2a2f1760c9';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const receiveMessage = response => ({
  message: response.data,
  type: RECEIVE_MESSAGE
})

export const loadMessage = () => {
  return dispatch => {
    fetch(URL).then(response =>
      dispatch(receiveMessage(response))
    ).catch(e => console.log(e.status)) ;
  }
}
