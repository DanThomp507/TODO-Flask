import React from 'react';
import Input from './Input';

export default function Header(props) {
  return (
    <header>
      <h1>My To-Do List</h1>
      <Input {...props} />
    </header>
  );
}