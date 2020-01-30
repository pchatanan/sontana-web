import ACTION_TYPES from "../actions";

const defaultState = {
  drawerIsOpen: false,
  user: null,
  authLoading: true,
  popup: {
    popupType: '',
    message: ''
  },
  showPopup: false,
  userLoc: {
    lat: 13.7563,
    lng: 100.5018,
    error: null
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
        popup: action.popup,
        showPopup: true
      }
    case ACTION_TYPES.DISMISS_POPUP:
      return {
        ...state,
        showPopup: false
      }
    case ACTION_TYPES.SET_USER_LOC:
      console.log(action)
      return {
        ...state,
        userLoc: action.userLoc
      }
    default:
      return state
  }
}

export default global