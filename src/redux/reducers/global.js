import ACTION_TYPES from "../actions";

const defaultState = {
  drawerIsOpen: false,
  user: null,
  authLoading: true,
  popup: {
    popupType: '',
    message: ''
  },
  showPopup: false
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
        popup: action.popup,
        showPopup: true
      }
    case ACTION_TYPES.DISMISS_POPUP:
      return {
        ...state,
        showPopup: false
      }
    default:
      return state
  }
}

export default global