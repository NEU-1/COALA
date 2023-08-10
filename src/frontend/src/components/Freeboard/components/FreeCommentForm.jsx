import React, {Component} from 'react';

class FreeCommentForm extends Component{
    state = {
        value: ''
    };
    handleChange = e => {
        const {value} = {...e.target};
        this.setState({
            ...this.state,
            value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const obj = {userid: '', content: this.state.value, date: '', updateFlag:''};
        this.props.addList(obj);
        this.setState({
            ...this.state,
            value: ''
        });
    };
    render() {
        return(
            <li className='comment-form'>
                <form onSubmit={this.handleSubmit}>
                    <span className='ps_box'>
                        <input 
                            type="text" 
                            className='int'
                            placeholder='댓글을 입력해 주세요.'
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                    </span>
                    <input type="submit" className='btn' value='등록'/>
                </form>
            </li>
        )
    }
};

export default FreeCommentForm;