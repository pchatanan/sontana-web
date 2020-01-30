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
  optionMenu: [],
  showOptionMenu: false,
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
      return {
        ...state,
        userLoc: action.userLoc
      }
    case ACTION_TYPES.SHOW_OPTION_MENU:
      return {
        ...state,
        optionMenu: action.optionMenu,
        showOptionMenu: true
      }
    case ACTION_TYPES.HIDE_OPTION_MENU:
      return {
        ...state,
        showOptionMenu: false
      }
    default:
      return state
  }
}

export default global