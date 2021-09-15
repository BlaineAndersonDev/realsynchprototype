import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
  };

  componentDidMount() {
  }

  getMessages = () => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(messages => this.setState({ messages }));
  }

  removeMessages = () => {
    this.setState({
      messages: []
    })
  }

  render() {

    return (
      <div className="messageContainer">
        {this.state.messages.length ? (
          <div className="messageDisplay">
            <h1 className="messageHeader">{this.state.messages.length} Messages!</h1>
            <ul className="messageTextContainer">
              {this.state.messages.map((message, index) =>
                <li key={message.id} className="messageText">
                  {message.message}
                </li>
              )}
            </ul>
            <button
              className="messageButton"
              onClick={this.removeMessages}>
              Remove Messages From State?
            </button>
          </div>
        ) : (
          <div className="messageDisplay">
            <h1 className="messageHeader">No messages :(</h1>
            <button
              className="messageButton"
              onClick={this.getMessages}>
              Get Messages From API?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Message;
