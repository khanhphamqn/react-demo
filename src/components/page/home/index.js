import React from 'react';
import { Link } from 'react-router'
import Input from '../../input'
import Validation from '../../validation'
import './css/style.scss';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 'signup'
		}
	}
	changeTab =(tab) => {
		this.setState({
			tab: tab
		});
	}
	render() {
		return (
			<div className="form">

				<ul className="tab-group">
					<li className={'tab' + (this.state.tab === 'signup' ? ' active' : '')} onClick={() => this.changeTab('signup')}><a href="javascript:void(0);">Sign Up</a></li>
					<li className={'tab' + (this.state.tab === 'login' ? ' active' : '')} onClick={() => this.changeTab('login')}><a href="avascript:void(0);">Log In</a></li>
				</ul>

				<div className="tab-content">
					<div className={'tab-inner-content' + (this.state.tab === 'signup' ? ' active' : '')} id="signup">
						<h1>Sign Up for Free</h1>
						<Validation action="/" method="post">
							<div className="top-row">
								<div className="field-wrap">
									<Input inputProps={{'data-rules': 'required', 'data-message': 'This field is required'}} name='firstname' type="text" label="First Name"/>
								</div>

								<div className="field-wrap">
									<Input inputProps={{'data-rules': 'required', 'data-message': 'This field is required'}} type="text" name='lastname' label="Last Name"/>
								</div>
							</div>
					  		<div className="field-wrap">
					  			<Input type="text" name='password' inputProps={{'data-rules': 'required', 'data-message': 'This field is required'}} label="Set A Password"/>
					  		</div>
					  		<button type="submit" className="button button-block">Get Started</button>
					  	</Validation>
					</div>
					<div className={'tab-inner-content' + (this.state.tab === 'login' ? ' active' : '')} id="login">
					  	<h1>Welcome Back!</h1>
					  	<Validation action="/" method="post">
							<div className="field-wrap">
								<Input type="text" name='email' inputProps={{'data-rules': 'required|email', 'data-message': 'This field is required|Please enter invalid email'}} label="Email Address"/>
						  	</div>
					  		<div className="field-wrap">
					  			<Input type="password" inputProps={{'data-rules': 'required', 'data-message': 'This field is required'}} name='password' label="Password"/>
					  		</div>
					  		<p className="forgot"><a href="javascript:void(0);">Forgot Password?</a></p>
					  		<button className="button button-block">Log In</button>
					  	</Validation>
					</div>
				</div>
			</div>
		);
	}
}
