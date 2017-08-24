import Home from '../../home';
import Bookstore from '../../bookstore';
import Navigation from '../../navigation';

const ListOfNav = [
	{
		type: 'Home',
		screen: Home
	},
	{
		type: 'Bookstore',
		screen: Bookstore
	},
	{
		type: 'Navigation',
		screen: null
	}
]

export {ListOfNav};