import React, {Component} from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class Commentapp extends Component{
    state = {
        list:[]
    };
    componentDidMount() {
        this.setState({
            ...this.state,
            list:[{userid: 'jenny1', content: '안녕하세요1', date: '2022-04-21', updateFlag: true}]
        });
    }
    addList = obj => {
        this.setState({
            ...this.state,
            list:[...this.state.list, obj]
        });
    };
    updateList = list => {
        this.setState({
            ...this.state,
            list
        });
    };
    render() {
        const {list} = this.state;
        return(
            <>
                <Comment value={this.state.value}>
                    <CommentForm addList={this.addList}/>
                    <CommentList list={list} updateList={this.updateList}/>
                </Comment>
            </>
        )
    }
};

export default Commentapp;