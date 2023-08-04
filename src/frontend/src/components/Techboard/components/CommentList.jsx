import React, {Component} from 'react';

class CommentList extends Component{
    state = {
        value: '',
        update: null
    };
    input = React.createRef();
    handleClick = i => e => {
        this.setState({
            ...this.state,
            value: e.target.innerHTML,
            update: i
        });
    };
    updateChange = e => {
        const {value} = {...e.target};
        this.setState({
            ...this.state,
            value
        });
    };
    updateKeyDown = i => e => {
        if (e.key !== 'Enter') return;
        const {updateList, list} = this.props;
        const newList = [...list];
        newList[i].content = this.state.value;
        this.setState({
            ...this.state,
            update: null
        });
        updateList(newList);
    };
    deleteClick = k => {
        const {updateList, list} = this.props;
        const newList = [...list].filter((v, i) => i !== k);
        updateList(newList);
    };
    items = () => this.props.list.map((v, k) => {
        return(
            <ul className='comment-row'>
                <li className='comment-id'>{v.userid}</li>
                <li className='comment-content'>
                    {
                        this.state.update === k ?
                        <input
                            type='text'
                            className='comment-update-input'
                            onChange={this.updateChange}
                            onKeyDown={this.updateKeyDown(k)}
                            value={this.state.value}
                            ref={this.input}
                        />
                        : (<>
                            <span onClick={this.handleClick(k)}>{v.content}</span>
                            <span className='comment-delete-btn' onClick={() => this.deleteClick(k)}>X</span>
                        </>)
                    }
                </li>
                <li className='comment-date'>{v.date}</li>
            </ul>
        )
    });
    render() {
        return(
            <li>{this.items()}</li>
        )
    }
};

export default CommentList;