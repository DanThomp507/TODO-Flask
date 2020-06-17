
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import FilteredList from './FilteredList';
import Footer from './Footer'
import { applyFilter } from '../services/filters'

export default function TodoList(props) {

  const { list, changeStatus, deleteItem, addNew, filter, changeFilter, mode, changeMode } = props;
  const items = applyFilter(list, filter);
  const count = list.length
  return (
    <div className='container'>
      <div className='row'>
        <div className='todolist'>
          <Header addNew={props.addNew} />
          {props
            ?
            <FilteredList
              {...{ items, changeStatus, deleteItem, addNew }}
            />
            :
            <p>No items in the list</p>
          }
          <Footer {...{ count, filter, changeFilter, mode, changeMode }} />
        </div>
      </div>

      <div onClick={() => props.history.push(`/logout`)} style={{ 'display': 'flex', 'justifyContent': 'center'}}>
        <button className="btn btn-primary"> Sign out
        </button>
      </div>

    </div>
  );
}