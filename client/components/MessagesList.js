import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import { fetchMessages } from '../redux/store';

class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.fetchMessages({ language: this.props.language });
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages.filter(
      (message) => message.channelId === channelId
    );

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    messages: state.messages,
    language: state.language,
  }),
  (dispatch) => ({
    fetchMessages: (params) => dispatch(fetchMessages(params)),
  })
)(MessagesList);
