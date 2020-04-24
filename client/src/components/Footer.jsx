import React from 'react';
import Filter from './Filters';
import ButtonWrapper from './ButtonWrapper'

export default function Footer(props) {
  const { count, filter, changeFilter, mode, changeMode } = props;

  return (
    <footer className="clearfix">
      <div className="float-left buttons">
        <ButtonWrapper {...props} />
      </div>
      <div className="float-left">
        <div className='count'>
          {`${count} items left`}
        </div>
      </div>
      <div className="float-right">
        <Filter {...{ filter, changeFilter }} />
      </div>
    </footer>
  );
}