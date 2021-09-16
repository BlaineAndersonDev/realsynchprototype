import React, { Component } from 'react';
import './CreateMessage.css';
import axios from 'axios';

class CreateMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      newMessage: ''
    };
  }

  // Prevent Message Creation if any field is empty.
  handleEmptyFields = async (event) => {
    // 'event.preventDefault()' Stops the page from reloading on every change to the message.
    event.preventDefault()
    if (!this.state.newMessage) { // State "newMessage" is empty
      alert("The Field 'Message' is empty! Cannot create Message.")
    } else { // All fields hold values
      await this.handleSubmit()
    }
  };

  handleMessageChange = async (event) => {
    await this.setState({newMessage: event.target.value})
  }

  handleSubmit = async (event) => {
    await this.handleCreateMessage(this.state.newMessage)
  }

  // Axios call to API to create the new Message in our backend 'helloWorld' object.
  handleCreateMessage = (message) => {
    axios.post(`/api/messages/create`, null, {
      params: {
        message: message
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      // Change state to blank for additional messages.
      this.setState({
        newMessage: ''
      })
      // Refresh messageDisplay.
      this.props.getMessages();
    });
  }

  render() {
    return (
      <div id="createMessageContainer">
        <form className="formFieldContainer" onSubmit={this.handleEmptyFields}>
          <div className="formField formTitle"> New Message: </div>
          <textarea className="formField formTextarea" type="textarea" value={this.state.newMessage} onChange={this.handleMessageChange} />
          <div className="formField">
            <input className="formButton" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateMessage;
