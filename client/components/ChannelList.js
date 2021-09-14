import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const LUNCH_CHANNEL = '/channels/3';

class ChannelList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul>
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active">
            <span># really_random</span>
            <span className="badge">
              {this.props.messages &&
                this.props.messages.filter((message) => message.channelId == 1)
                  .length}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
            <span className="badge">
              {this.props.messages &&
                this.props.messages.filter((message) => message.channelId == 2)
                  .length}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active">
            <span># lunch_planning</span>
            <span className="badge">
              {this.props.messages &&
                this.props.messages.filter((message) => message.channelId == 3)
                  .length}
            </span>
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default connect(
  (state) => ({
    messages: state.messages,
  }),
  null
)(ChannelList);
