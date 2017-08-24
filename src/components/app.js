import React from 'react';
import Header from './header'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { toggle, changeScreen } from '../actions/navigation';
import { ListOfNav } from './page/navigation/list';
import './transition.scss';
import { browserHistory } from 'react-router';

const showHamburger = ['/navigation'];


const mapStateToProps = state => {
	return {
		open: state.navigation.open
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggle: (tg) => {
			dispatch(toggle(tg));
		},
		 toggleScreen: (screen) => {
			dispatch(changeScreen(screen));
		},
	}
}

class Template extends React.Component {
	static propTypes = {
	  children: PropTypes.element.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			firstChild: this.props.children,
			secondChild: null
		}
	}
	componentWillReceiveProps (nextProp) {
		if(!this.state.secondChild){
			this.state.secondChild = nextProp.children;
			// this.forceUpdate();
		}
		else{
			this.state.firstChild = this.state.secondChild;
			this.state.secondChild = nextProp.children;
		}
		if(showHamburger.indexOf(browserHistory.getCurrentLocation().pathname) ===-1){
			this.doTransition();
		}
		else{
			this.state.firstChild = null;
		}
	}
	doTransition() {
		return new Promise((transitionDone, transitionFailed) => {
		  	this.forceUpdate(() => {
				const prevChildDom = ReactDOM.findDOMNode(this.refs.firstChild);
				const newChildDom = ReactDOM.findDOMNode(this.refs.secondChild);
				let timeout = 500;
				const start = () => {
				  	if (newChildDom) {
				  		newChildDom.classList.add('transition-item');
						newChildDom.classList.add('transition-appear');
						newChildDom.offsetHeight; // Trigger layout to make sure transition happen
						newChildDom.classList.add('transition-appear-active');
				  	}
				  	if (prevChildDom) {
						prevChildDom.classList.add('transition-leave');
						prevChildDom.classList.add('transition-item');
						prevChildDom.offsetHeight; // Trigger layout to make sure transition happen
						prevChildDom.classList.add('transition-leave-active');
				  	}
				  	return Promise.resolve();
				};

				// Wait for transition
				const waitForTransition = () => new Promise(resolve => {
				  	setTimeout(() => {
						// Swap child and remove the old child
						this.state.firstChild = null;
						this.forceUpdate(resolve);
				  	}, timeout);
				});

				// Remove appear and active class (or trigger manual end)
				const end = () => {
				  	if (newChildDom.classList.contains('transition-item')) {
						newChildDom.classList.remove('transition-appear');
						newChildDom.classList.remove('transition-item');
						newChildDom.classList.remove('transition-appear-active');
				  	}
				  	if (prevChildDom && prevChildDom.classList.contains('transition-item')) {
						prevChildDom.classList.remove('transition-leave');
						prevChildDom.classList.remove('transition-item');
						prevChildDom.classList.remove('transition-leave-active');
				  	}
				  	return Promise.resolve();
				};

			Promise.resolve()
				.then(start)
				.then(waitForTransition)
				.then(end)
				.then(() => {
					transitionDone();
				})
				.catch(transitionFailed);

		 	});
		});
	}
	render() {
		return (
			<div className='wrapper-app'>
				<div className='inner-app'>
					<Header/>
					<div className='view'>
						{React.Children.map(this.state.firstChild, element =>
							React.cloneElement(element, { ref: 'firstChild' })
						)}
						{React.Children.map(this.state.secondChild, element =>
						  React.cloneElement(element, { ref: 'secondChild' })
						)}
						{/*this.props.children*/}
					</div>
				</div>
				<div className={'navigation-menu' + (this.props.open ? ' open': '')}>
					<h4>List of Navigation</h4>
					<div className='nav-list'>
						<ul>
							{ListOfNav.map((nav, idx) => <li onClick={()=> {this.props.toggleScreen(nav.type);this.props.toggle(!this.props.open)}} key={idx}>{nav.type}</li>)}
						</ul>
					</div>
				</div>
				<div onClick={() => this.props.toggle(!this.props.open)} className={'overlay-nav' + (this.props.open ? ' open': '')}></div>
			</div>
		);
	}
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);

export default App;
