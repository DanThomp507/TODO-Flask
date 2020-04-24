
import React from 'react';
import Header from './Header';
import FilteredList from './FilteredList';

export default function TodoList(props) {
  const { list, changeStatus, deleteItem, addNew } = props;
  const items = list;
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <Header addNew={props.addNew} />
          {props
            ? 
            <FilteredList {...{items, changeStatus, deleteItem, addNew}} />
            :
            <p>No items in the list</p>
          }
        </div>
      </div>
    </div>
  );
}