import services from '../services';
let time = null;
let observeFetch;

export const inputContent = ip => {
	return {
		type: 'INPUT_CONTENT',
		searchContent: ip
	}
};


export function search (items){
	return (dispatch, store) => {
		dispatch({
			type: 'INPUT_CONTENT',
			searchContent: items,
			fetching: true
		});
		if(time){
			clearTimeout(time);
		}
		time = setTimeout(() => {
			if(items){
				observeFetch = window.fetch(`${services.search}?q=${items}`, {
					method: "GET"
				});
				return observeFetch.then(function(response) {
					return response.json();
				}).then(function(res) {
					dispatch({
						type: 'SEARCH',
						results: res.items,
						fetching: false
					});
				});
			}
			else{
				dispatch({
					type: 'SEARCH',
					results: store().search.results,
					fetching: null
				});
			}
		}, 500);
	}
};