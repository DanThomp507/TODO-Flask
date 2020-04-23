
import React from 'react';
import Header from './Header';
import FilteredList from './FilteredList';

export default function TodoList(props) {
  // const { list } = props.d
  // const { addNew, changeStatus, deleteItem } = props.actions;
  // const items = list;
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <Header 
          addNew={props.addNew}
          />
          {
            props
            ? 
            <FilteredList 
            items={props.list}
            deleteItem={props.deleteItem}
            changeStatus={props.changeStatus}
            addNew={props.addNew}
            />
            // <FilteredList {...items, changeStatus, deleteItem }} />
            :
            <p>No items in the list</p>
          }
        </div>
      </div>
    </div>
  );
}