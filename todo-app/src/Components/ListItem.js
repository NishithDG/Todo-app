import React from 'react'

const ListItem = (props) => {
    return <li className='list-group-item font-weight-bold'>
        <button className='m-3 btn btn-success' onClick={props.editTask}>
            <i className="fas fa-edit"></i>
        </button>
        {props.item.name}
        <button className='m-3 btn btn-danger' onClick={props.deleteTask}>
            <i className="fa fa-trash"></i>
        </button>
    </li>
}
export default ListItem 