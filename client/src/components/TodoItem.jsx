import React from 'react';
import CheckBox from './Checkbox';

export default function TodoItem(props) {
  const { data, changeStatus, deleteItem } = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
  const handleDelete = (item) => deleteItem(data.id);
  const className = 'todo-item ui-state-default ' + (data._is_done === 1 ? 'completed' : 'pending');
  return (
    <li key={data.id} className={className}>
      <div className="checkbox">
        <label>
          <CheckBox key={data.id} checked={data._is_done} onChange={handleChange} /> {data.Title}
        </label>
        <div className='delete' style={{ float: "right" }}>
          <a onClick={handleDelete}>Delete</a>
        </div>
      </div>
    </li>
  );
}