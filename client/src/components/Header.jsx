import React from 'react';
import Input from './Input';

export default function Header(props) {
  return (
    <header>
      <h1>Things To-Do</h1>
      <Input {...props} />
    </header>
  );
}