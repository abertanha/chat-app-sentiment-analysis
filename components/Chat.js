import React, { Component, Fragment } from "react";
import axios from "axios";
import Pusher from "pusher-js";

class Chat extends Component {
  state = { chats: [] };
  componentDidMount() {
    // Pusher connection config
    this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    // Component lifecycle method
    this.channel = this.pusher.subscribe("chat-room");

    this.channel.bind("new-message", ({ chat = null }) => {
      const { chats } = this.state;
      // populating chat with new msgs
      chat && chats.push(chat);
      this.setState({ chats });
    });
    // creating and bindin user with chat history
    this.pusher.connection.bind("connected", () => {
      axios.post("/messages").then((response) => {
        // populating with chat history
        const chats = response.data.messages;
        this.setState({ chats });
      });
    });
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }
  // method to send chat input
  handleKeyUp = (evt) => {
    const value = evt.target.value;

    if (evt.keyCode === 13 && !evt.shiftKey) {
      const { activeUser: user } = this.props;
      const chat = { user, message: value, timestamp: +new Date() };

      evt.target.value = "";
      axios.post("/message", chat);
    }
  };

  render() {
    return (
      this.props.activeUser && (
        <Fragment>
          <div
            className="border-bottom border-gray w-100 d-flex align-items-center bg-white"
            style={{ height: 90 }}
          >
            <h2 className="text-dark mb-0 mx-4 px-2">
              {this.props.activeUser}
            </h2>
          </div>
          <div
            className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light"
            style={{ minHeight: 90 }}
          >
            {/* textbox for the user input */}
            <textarea
              className="form-control px-3 py-2"
              onKeyUp={this.handleKeyUp}
              placeholder="Enter a chat message"
              style={{ resize: "none" }}
            ></textarea>
          </div>
        </Fragment>
      )
    );
  }
}

export default Chat;
