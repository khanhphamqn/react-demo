import React from 'react';
import { Link } from 'react-router'
import './css/style.scss';
import { connect } from 'react-redux';
import { toggle } from '../../actions/navigation';
import { browserHistory } from 'react-router';

const showHamburger = ['/navigation'];

const mapStateToProps = state => {
  	return {
		open: state.navigation.open
  	}
}

const mapDispatchToProps = (dispatch) => {
  	return {
		onClick: (tg) => {
	  		dispatch(toggle(tg));
		}
  	}
}

class Template extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: (showHamburger.indexOf(browserHistory.getCurrentLocation().pathname) !==-1)
		}
		browserHistory.listen( location =>  {
            this.setState({
            	show: showHamburger.indexOf(location.pathname) !==-1
            });
        });
	}

	render() {
		return (
			<header className="header-basic">
				<div className="header-limiter">
					<h1><Link to="/home">Company<span>logo</span></Link></h1>
					<nav>
						<Link to="/home" activeClassName="selected">Home</Link>
						<Link to="/bookstore" activeClassName="selected">Bookstore</Link>
						<Link to="/navigation" activeClassName="selected">Navigation</Link>
					</nav>
					{this.state.show && <div onClick={() => this.props.onClick(!this.props.open)} className='navigation'>
						<img src={require('../../assets/icons/menu-white.svg')}/>
					</div>}
				</div>
			</header>
		);
	}
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);

export default Header;