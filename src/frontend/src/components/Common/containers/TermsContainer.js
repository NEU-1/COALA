import React from 'react';
import Terms from '../Terms';

const TermsContainer = ({ title, text, checked, onChange }) => {
  return (
    <Terms title={title} text={text} checked={checked} onChange={onChange} />
  );
};

export default TermsContainer;
