const navigation = (state = {
  open: false,
  currentScreen: 'Navigation'
}, action) => {
  switch (action.type) {
    case 'CHANGE_SCREEN':
      return {
        ...state,
        currentScreen: action.screen
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        open: action.toggle
      };
    default:
      return state
  }
};

export default navigation;