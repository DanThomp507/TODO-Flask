
import React from 'react';
import Header from './Header';
import FilteredList from './FilteredList';
import Footer from './Footer'
import { applyFilter } from '../services/filters'

export default function TodoList(props) {

  const { list, changeStatus, deleteItem, addNew, filter, changeFilter, mode, changeMode } = props;
  const items = applyFilter(list, filter);
  const count = list.length
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <Header addNew={props.addNew} />
          {props
            ? 
            <FilteredList
            {...{items, changeStatus, deleteItem, addNew}} 
            />
            :
            <p>No items in the list</p>
          }
           <Footer {...{count, filter, changeFilter, mode, changeMode}}/>
        </div>
      </div>
    </div>
  );
}