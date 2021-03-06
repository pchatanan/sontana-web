const ACTION_TYPES = {
  SET_TEXT: 'SET_TEXT',
  CLEAR_TEXT: 'CLEAR_TEXT',
  SET_DRAWER: 'SET_DRAWER',
  SET_USER: 'SET_USER',
  RESET_FORM: 'RESET_FORM',
  SET_POPUP: 'SET_POPUP',
  DISMISS_POPUP: 'DISMISS_POPUP',
  SET_USER_LOC: 'SET_USER_LOC',
  SHOW_OPTION_MENU: 'SHOW_OPTION_MENU',
  HIDE_OPTION_MENU: 'HIDE_OPTION_MENU',
}

export const setText = (key, text) => {
  return {
    type: ACTION_TYPES.SET_TEXT,
    key, text
  }
}

export const clearText = (key) => {
  return {
    type: ACTION_TYPES.CLEAR_TEXT,
    key
  }
}

export const setDrawer = (isOpen) => {
  return {
    type: ACTION_TYPES.SET_DRAWER,
    isOpen
  }
}

export const setUser = (user) => {
  return {
    type: ACTION_TYPES.SET_USER,
    user
  }
}

export const resetForm = () => {
  return {
    type: ACTION_TYPES.RESET_FORM
  }
}

export const setPopup = (popupType, message) => {
  return {
    type: ACTION_TYPES.SET_POPUP,
    popup: {
      popupType,
      message
    }
  }
}

export const dismissPopup = () => {
  return {
    type: ACTION_TYPES.DISMISS_POPUP
  }
}

export const setUserLoc = ({ lat, lng, error }) => {
  return {
    type: ACTION_TYPES.SET_USER_LOC,
    userLoc: {
      lat, lng, error
    }
  }
}

export const showOptionMenu = (optionMenu) => {
  console.log(optionMenu)
  return {
    type: ACTION_TYPES.SHOW_OPTION_MENU,
    optionMenu
  }
}

export const hideOptionMenu = () => {
  return {
    type: ACTION_TYPES.HIDE_OPTION_MENU
  }
}

export default ACTION_TYPES