import React, {Component} from 'react';
import FreeComment from './FreeComment';
import FreeCommentForm from './FreeCommentForm';
import FreeCommentList from './FreeCommentList';
import styled from 'styled-components';

class FreeCommentapp extends Component{
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
                <FreeComment value={this.state.value}>
                    <FreeCommentForm addList={this.addList}/>
                    <FreeCommentList list={list} updateList={this.updateList}/>
                </FreeComment>
            </Slayout>
        )
    }
};

export default FreeCommentapp;

const Slayout = styled.div`
  margin-top: 170px;
  width: 800px;
`