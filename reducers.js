import { RECEIVE_MESSAGE, SEND_MESSAGE } from './actions';

export default (state = { message: '', sentSuccess: true }, action) => {
  console.log(action)
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messageToSend: action.message,
        sentSuccess: action.sentSuccess
      }
    default:
      return state;
  }
}
