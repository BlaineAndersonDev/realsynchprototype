import React, { Component } from 'react';
import './Student.css';
import axios from 'axios';
import IndividualMessage from './IndividualMessage.js';
import CreateMessage from './CreateMessage.js';

class Student extends Component {
  constructor(props){
    super(props);
    this.state = {
      students: [],
    };
  };

  async componentDidMount() {
    try {
      this.timer = setTimeout(() => {}, 1000);
      await this.getStudents();
    } catch (error) {
      console.log(error)
    }
  };

  removeStudentsFromState = async () => {
    await this.setState({
      students: []
    })
  }

  getStudents = async () => {
    await axios.get(`/api/students`)
    .catch(error => {
      console.warn(error);
    })
    .then(response => {
      this.setState({
        students: response.data
      })
    })
  };

  render() {
    // During the render, we check if this.state.students has any objects.
    let messageDisplay;
    if (this.state.students.length >= 1) {
      // If yes, we display those objects as well as:
        // The 'removeStudentsFromState' option to remove objects from state,
        // The '<CreateMessage />' Component to allow users to create their own students,
      messageDisplay = (
        <div className="messageDisplay">
          <h1 className="messageHeader">{this.state.students.length} Messages!</h1>
          <div className="messageTextContainer">
            {this.state.students.map((message, index) =>
              <IndividualMessage
                key={message.id}
                message={message}
                getStudents={this.getStudents}
              />
            )}
          </div>
          <CreateMessage getStudents={this.getStudents}/>
          <button
            className="messageButton"
            onClick={this.removeStudentsFromState}>
            Remove Messages From State?
          </button>
        </div>
      )
    } else {
      // If no, then we display the option to 'getStudents' from the API.
      messageDisplay = (
        <div className="messageDisplay">
          <h1 className="messageHeader">No students :(</h1>
          <CreateMessage getStudents={this.getStudents}/>
          <button
            className="messageButton"
            onClick={this.getStudents}>
            Get Messages From API?
          </button>
        </div>
      )
    };

    return (
      <div className="messageContainer">
        {messageDisplay}
      </div>
    );
  }
}

export default Student;
