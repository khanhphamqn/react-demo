import React from 'react';
import { Link } from 'react-router'
import Input from '../../input'
import Validation from '../../validation'
import './css/style.scss';
import { connect } from 'react-redux';
import { ListOfNav } from './list';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    screen: state.navigation.currentScreen
  }
}

class Template extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const screen = _.find(ListOfNav, (o) => { return o.type === this.props.screen; });
		const Screen = screen.screen;
		return (
			<div className="navigation-container">
				{Screen ? <Screen/> : Screen}
			</div>
		);
	}
}

const Navigation = connect(
  mapStateToProps
)(Template);

export default Navigation;