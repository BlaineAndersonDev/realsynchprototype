import React, { Component } from 'react';
import './DeleteMessage.css';

class DeleteMessage extends Component {
  // Normally you would create a contstructor here like in our other components, but since this Component does not store any information and only uses Props, it is unnecessary.

  handleConfirm = () => {
    this.props.handleDeleteMessage(this.props.message)
  }

  handleDeny = (event) => {
    this.props.handleDenyDeleteMessage()
  }

  render() {
    return (
      <div id="deleteMessageContainer">
        <h3 className="deleteTitle">Are you sure you wish to delete this joke?</h3>
        <div className="deleteButtonWrapper">
          <button onClick={this.handleConfirm} className="deleteButton">Yes</button>
          <button onClick={this.handleDeny} className="deleteButton">No</button>
        </div>
      </div>
    );
  }
}

export default DeleteMessage;
