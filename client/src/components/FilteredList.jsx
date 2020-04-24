import React from 'react';
import TodoItem from './TodoItem';

export default function FilteredList(props) {
  const { items, changeStatus, deleteItem } = props;
  if (props.items.length === 0){
    return (
      <p className="alert alert-info">No items in your To-Do List</p>
    );
  }

  return (
    <ul className="list-unstyled">
      {items.map((item, index) => (
        <TodoItem 
        key={index} 
        data={item} 
        changeStatus={changeStatus} 
        deleteItem={deleteItem} />
      ))}
    </ul>
  );
}