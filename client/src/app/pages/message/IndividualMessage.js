import React, { Component } from 'react';
import EditMessage from './EditMessage.js';
import DeleteMessage from './DeleteMessage.js';
import './IndividualMessage.css';
import axios from 'axios';

class IndividualMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleEditMenu: false,
      toggleDeleteMenu: false
    };
  }

// ===========================
// Edit Functions ============
// ===========================
  onEditMenuClick = () => {
    this.setState({toggleEditMenu: true})
  }

  handleCancelEditMessage = () => {
    this.setState({toggleEditMenu: false})
  }

  handleUpdateMessage = (messageId, messageText) => {
    axios.put(`/api/messages/update/${messageId}`, null, {
      params: {
        messageText: messageText
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      this.setState({toggleEditMenu: false})
      this.props.getMessages();
    });
  }

// ===========================
// Delete Functions ==========
// ===========================
  onDeleteMenuClick = () => {
    this.setState({toggleDeleteMenu: true})
  }

  handleDenyDeleteMessage = () => {
    this.setState({toggleDeleteMenu: false})
  }

  handleDeleteMessage = (message) => {
    const id = message.id;
    axios.delete(`/api/messages/delete/${id}`, null)
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      this.setState({toggleDeleteMenu: false})
      this.props.getMessages();
    });
  }

  render() {
    // ========== Render Edit Displays ==========
    let editButtonDisplay = null;
    if (this.state.toggleEditMenu) { // If this.state.toggleEditMenu = true
      editButtonDisplay = (
        <div></div>
      );
    } else {  // If this.state.toggleEditMenu = false
      editButtonDisplay = (
        <button onClick={this.onEditMenuClick} className="alterMessageButton">Edit</button>
      );
    }

    let editDisplay = null;
    if (this.state.toggleEditMenu) { // If this.state.toggleEditMenu = true
      editDisplay = (
        <EditMessage
          key={this.props.message.id}
          message={this.props.message}
          handleUpdateMessage={this.handleUpdateMessage}
          getMessages={this.props.getMessages}
        />
      )
    } else {  // If this.state.toggleEditMenu = false
      editDisplay = (
        <div></div>
      );
    }

    // ========== Render Delete Displays ==========
    let deleteButtonDisplay = null;
    if (this.state.toggleDeleteMenu) { // If this.state.toggleDeleteMenu = true
      deleteButtonDisplay = (
        <div></div>
      );
    } else {  // If this.state.toggleDeleteMenu = false
      deleteButtonDisplay = (
        <button onClick={this.onDeleteMenuClick} className="alterMessageButton">Delete</button>
      );
    }

    let deleteDisplay = null;
    if (this.state.toggleDeleteMenu) { // If this.state.toggleDeleteMenu = true
      deleteDisplay = (
        <DeleteMessage
          key={this.props.message.id}
          message={this.props.message}
          handleDeleteMessage={this.handleDeleteMessage}
          handleDenyDeleteMessage={this.handleDenyDeleteMessage}
        />
      )
    } else {  // If this.state.toggleDeleteMenu = false
      deleteDisplay = (
        <div></div>
      );
    }

    return (
      <div className="individualMessageContainer">

        <div className="messageDisplayWrapper">
          <div className="idContainer">
            <p className="individualMessageId">{this.props.message.id}</p>
          </div>

          <div className="messageContainer">
            <p className="individualMessageMessage">{this.props.message.message}</p>
          </div>

          <div className="buttonContainer">
            <p className="individualMessageAlter">{editButtonDisplay}</p>
            <p className="individualMessageAlter">{deleteButtonDisplay}</p>
          </div>
        </div>

        <div className="messageEditWrapper">
          {editDisplay}
        </div>

        <div className="messageDeleteWrapper">
          {deleteDisplay}
        </div>

      </div>
    );
  }
}

export default IndividualMessage;
