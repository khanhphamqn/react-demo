import React from 'react';
import { Link } from 'react-router'
import Input from '../../input'
import Validation from '../../validation'
import './css/style.scss';
import { connect } from 'react-redux';
import { inputContent, search } from '../../../actions/search';

const mapStateToProps = state => {
  return {
    searchContent: state.search.searchContent,
    fetching: state.search.fetching,
    results: state.search.results
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        enter: (ip) => {
        	// dispatch(inputContent(ip));
        	dispatch(search(ip));
        }
    }
}

const splitString = (text, length) => {
	let stringReg = '.{'+ length +'}';
	let newReg = new RegExp(stringReg,'g');
	return text && text.length > length ? (text.match(newReg)[0] + '...') : text;
}

class Bookstore extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const items = this.props.results.map((item, idx) => {
			const des = item.volumeInfo.description && splitString(item.volumeInfo.description, 249);
			const title = item.volumeInfo.title && splitString(item.volumeInfo.title, 30);
			const subtitle = item.volumeInfo.subtitle && splitString(item.volumeInfo.subtitle, 30);
			return (
				<div className={'book-item' + (this.props.fetching ? '' : (this.props.fetching !== null ? ' zoomIn' : ''))} key={idx}>
					<div className='inner'>
						<div className='book-item-header'>
							<div className='title'>
								<h3>{title}</h3>
								<p>{subtitle}</p>
							</div>
							<div className='thumb'>
								<img src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail :  require('../../../assets/images/dummy.png')}/>
							</div>
						</div>
						<div className='book-item-body'>
							<p>{des}</p>
						</div>
						<div className='book-item-footer'>
							<h5>Written By:</h5>
							<span>{item.volumeInfo.authors ? item.volumeInfo.authors.join(' and ') : 'Author Unknown'}</span>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="Bookstore">
				<div className='Bookstore-header'>
					<h2>Find a Book</h2>
					<Validation action="/" method="post">
						<div className='search-area'>
							<Input initValue={this.props.searchContent} onChange={this.props.enter} inputProps={{'data-rules': 'required', 'data-message': 'This field is required'}} name='search' type="text" label="Search a book"/>
							{this.props.fetching && <div className='loader'></div>}
						</div>
					</Validation>
				</div>
				<div className='Bookstore-list'>
					{items}
				</div>
			</div>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookstore);