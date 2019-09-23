import ACTION_TYPES from "../actions";

const initState = {
  email: '',
  password: '',
  confirm_password: '',
  error: ''
}

const registerPage = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TEXT:
      return {
        ...state,
        [action.key]: action.text
      }
    case ACTION_TYPES.RESET_FORM:
      return { ...initState }
    default:
      return state
  }
}

export default registerPage