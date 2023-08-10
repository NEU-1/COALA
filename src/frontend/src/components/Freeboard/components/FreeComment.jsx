import React, {Component}from "react";
import styled from "styled-components";
import FreeCommentForm from './FreeCommentForm';
import FreeCommentList from './FreeCommentList';


class FreeComment extends Component{
    render() {
        return(
            <ul className='comment'>
                {this.props.children}
            </ul>
        )
    }
};

export default FreeComment;

