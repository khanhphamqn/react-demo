const search = (state = {
  searchContent: '',
  fetching: false,
  results: []
}, action) => {
  switch (action.type) {
    case 'INPUT_CONTENT':
      return {
        ...state,
        searchContent: action.searchContent,
        fetching: action.fetching
      };
    case 'SEARCH':
      return {
        ...state,
        results: action.results,
        fetching: action.fetching
      };
    default:
      return state
  }
};

export default search;