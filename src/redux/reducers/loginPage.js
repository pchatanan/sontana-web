import ACTION_TYPES from "../actions";

const initState = {
  email: '',
  password: ''
}

const loginPage = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TEXT:
      return {
        ...state,
        [action.key]: action.text
      }
    default:
      return state
  }
}

export default loginPage