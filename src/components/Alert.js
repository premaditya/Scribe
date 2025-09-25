import React from 'react'

function Alert(props) {
    const capitalize = (word) =>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
    <div style={{height: '15px'}}> 
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show alert-small`} role="alert">
      <strong>{props.alert.message}</strong> 
      
      </div>}
    </div>
  )
}

export default Alert
