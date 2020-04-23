import React from 'react';
import Input from './Input';

export default function Header(props) {
  const { addNew } = props;
  return (
    <header>
      <h1>My To-Do List</h1>
      <Input {...{ addNew }} />
    </header>
  );
}