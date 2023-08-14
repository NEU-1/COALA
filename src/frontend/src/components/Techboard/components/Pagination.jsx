import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.isActive ? '#BD84FC' : '#E9D5FF')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Pagination = ({ totalPages, currentPage, onPageClick }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          isActive={currentPage === i}
          onClick={() => onPageClick(i)}
        >
          {i}
        </PaginationButton>
      );
    }
    return buttons;
  };

  return (
    <PaginationContainer>
      {renderPaginationButtons()}
    </PaginationContainer>
  );
};

export default Pagination;