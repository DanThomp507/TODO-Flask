
import React from 'react';
import Header from './Header';
import FilteredList from './FilteredList';

export default function TodoList(props) {
  console.log(props)
  // const { list } = props.d
  // const { addNew, changeStatus, deleteItem } = props.actions;
  // const items = list;
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <Header />
          {/* <Header {...{addNew}} */}
          {/* /> */}
          {
            props
            ? 
            <FilteredList 
            items={props.list}
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