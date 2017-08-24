export const toggle = tg => {
  return {
    type: 'TOGGLE_NAV',
    toggle: tg
  }
};

export const changeScreen = screen => {
  return {
    type: 'CHANGE_SCREEN',
    screen: screen
  }
};