import React from 'react';
import TodoItem from './TodoItem';

export default function FilteredList(props) {
  console.log(props)
  const { items, changeStatus, deleteItem } = props;
  if (props.items.length === 0){
  // if (items.length === 0) {
    return (
      <p className="alert alert-info">No items in your To-Do List</p>
    );
  }


  return (
    <ul className="list-unstyled">
      {items.map(item => (
        <TodoItem 
        key={item.id} 
        data={item} 
        changeStatus={changeStatus} 
        deleteItem={deleteItem} />
      ))}
    </ul>
  );
}