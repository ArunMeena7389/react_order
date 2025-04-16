export const setLoading = (action) => (dispatch) => {
  console.log(action,'action');
  
  if (action) {
    dispatch({ type: 'SHOW_LOADER' });
  }

  setTimeout(() => {
    dispatch({ type: 'HIDE_LOADER' });
  }, 2000);
};