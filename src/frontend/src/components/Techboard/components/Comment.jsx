import React, {Component}from "react";
import styled from "styled-components";
import CommentForm from './CommentForm';
import CommentList from './CommentList';


class Comment extends Component{
    render() {
        return(
            <ul className='comment'>
                {this.props.children}
            </ul>
        )
    }
};

export default Comment;

