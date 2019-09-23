import ACTION_TYPES from "../actions";

const defaultState = {
  drawerIsOpen: false,
  user: null,
  authLoading: true,
  popup: {
    popupType: '',
    message: ''
  }
}

const global = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DRAWER:
      return {
        ...state,
        drawerIsOpen: action.isOpen
      }
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.user,
        authLoading: false
      }
    case ACTION_TYPES.SET_POPUP:
      return {
        ...state,
        popup: action.popup
      }
    default:
      return state
  }
}

export default global