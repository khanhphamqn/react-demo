import React from 'react';
import PropTypes from 'prop-types';
import './css/style.scss';
import ReactDOM from 'react-dom';

export default class Input extends React.Component {
    static defaultProps = {
      initValue: '',
      inputProps: {}
    };
    static propTypes = {
      inputProps: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            initValue: this.props.initValue
        };
    }

    handleChange = (event) => {
        this.setState({
            initValue: event.target.value
        });
        if(this.props.onChange){
           this.props.onChange(event.target.value);
        }
    }
    componentDidMount () {
        const required = Object.keys(this.props.inputProps).length !== 0 && this.props.inputProps.constructor === Object;
        if(required){
            let input = ReactDOM.findDOMNode(this.refs[this.props.name]);
            input.data=this;
        }
    }
    render() {
        const {type, name, label} = this.props;
        const required = Object.keys(this.props.inputProps).length !== 0 && this.props.inputProps.constructor === Object;
        return (
            <div className='input-component'>
                <label className={(this.state.initValue ? 'active' : '')}>{label}{required && <span className="req">*</span>}</label>
                <input ref={name} value={this.state.initValue} onChange={this.handleChange} name={name} {...this.props.inputProps} type={type} autoComplete="off" />
                {this.state.error && <span className='error-message'>{this.state.error}</span>}
            </div>
        );
    }
}
