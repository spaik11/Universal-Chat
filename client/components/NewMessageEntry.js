import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../redux/store';
class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.props.write(evt.target.value);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const content = this.props.newMessageEntry;
    const channelId = this.props.channelId;
    const name = this.props.name;
    const language = this.props.language;

    this.props.post({ content, channelId, name, language });
    this.props.write('');
  }
  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

export default connect(
  (state) => ({
    newMessageEntry: state.newMessageEntry,
    name: state.name,
    language: state.language,
  }),
  (dispatch) => ({
    post: (message) => dispatch(postMessage(message)),
    write: (e) => dispatch(writeMessage(e)),
  })
)(NewMessageEntry);
