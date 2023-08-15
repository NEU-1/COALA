import React, {Component} from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import styled from 'styled-components';

class Commentapp extends Component{
    state = {
        list:[]
    };
    componentDidMount() {
        this.setState({
            ...this.state,
            list:[{userid: '', content: '', date: '', updateFlag: ''}]
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
            <Slayout>  
                <Comment value={this.state.value}>
                    <CommentForm addList={this.addList}/>
                    <CommentList list={list} updateList={this.updateList}/>
                </Comment>
            </Slayout>
        )
    }
};

export default Commentapp;

const Slayout = styled.div`
  margin-top: 170px;
  width: 800px;
`