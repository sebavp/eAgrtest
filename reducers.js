import { RECEIVE_MESSAGE } from './actions';

export default (state = { message: '' }, action) => {
  console.log(action)
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
}
