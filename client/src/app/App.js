// Import React & 'Component' which allows us to create Components as well as render JSX.
import React, { Component } from 'react';
// Import our CSS file for styling.
import './App.css';

class App extends Component {
  // Initialize props & state
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
  };

  // componentDidMount will run immidiately after the page is called, usually prior to a user seeing anything.
  componentDidMount() {
  }

  // getMessages is written in ES6 syntax. It makes a call to our API using 'fetch' and sets the information into state for us to use.
  getMessages = () => {
    // Get the messages from the specified route.
    fetch('/api/messages')
      // Convert the response into JSON.
      .then(res => res.json())
      // Set the (now JSON) response into state to be used later.
      .then(messages => this.setState({ messages }));
  }

  render() {

    return (
      <div className="App">
        {/* Check our state for messages. */}
        {this.state.messages.length ? (
          // If we have messages in state then render them.
          <div>
            <h1>4 Messages!</h1>
            <ul className="messages">
              {this.state.messages.map((message, index) =>
                <li key={message.id}>
                  {message.message}
                </li>
              )}
            </ul>
          </div>
        ) : (
          // Otherwise render a button to call our API for messages.
          <div>
            <h1>No messages :(</h1>
            <button
              className="more"
              onClick={this.getMessages}>
              Get Messages From API?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
