import React, { Component } from 'react';
import './EditMessage.css';

class EditMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      editedMessage: ''
    };
  }

  componentDidMount() {
    this.setState({editedMessage: this.props.message.message})
  }

  handleMessageChange = (event) => {
    this.setState({editedMessage: event.target.value})
  }

  // Prevent Message creation if any field is empty.
  handleEmptyFields = (event) => {
    event.preventDefault()
    if (!this.state.editedMessage) { // State "editedMessage" is empty
      alert("The Field 'Message' is empty! Cannot create Message.")
    }
    else { // All fields hold values
      this.handleSubmit()
    }
  }

  handleSubmit = (event) => {
    this.props.handleUpdateMessage(this.props.message.id, this.state.editedMessage)
  }

  handleCancel = (event) => {
    event.preventDefault();
    this.props.handleCancelEditMessage();
  }

  render() {
    return (
      <div id="editMessageContainer">
        <form className="formFieldEditContainer" onSubmit={this.handleEmptyFields}>
          <div className="formFieldEdit formEditTitle"> Edit Message: </div>
          <input className="formFieldEdit formEditTextarea" type="text" value={this.state.editedMessage} onChange={this.handleMessageChange} />
          <div className="formFieldEdit">
            <input className="formEditButton" type="submit" value="Submit" />
            <button onClick={this.handleCancelEditMessage} className="cancelEditButton">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditMessage;
