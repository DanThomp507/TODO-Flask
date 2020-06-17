import React from 'react'

export default props => {
  return (
    <div className='logout-container'>
      <h2>Logout</h2>
      <form className='logout'>
        <div className='button-container'>
          <button className='btn btn-primary' type='submit' onClick={props.handleLogout}>
            Log Out
        </button>
          <button className='btn btn-primary' type='submit' onClick={() => props.history.push(`/home`)}>
            Cancel
        </button>
        </div>
      </form>
    </div>
  )
}