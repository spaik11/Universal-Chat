import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from '../socket';

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const WRITE_AUTHOR = 'WRITE_AUTHOR';
const SET_LANGUAGE = 'SET_LANGUAGE';

const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const gotNewMessageFromServer = (message) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message,
});

export const writeMessage = (inputContent) => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent,
});

export const writeAuthor = (name) => ({
  type: WRITE_AUTHOR,
  name,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  language,
});

export const postMessage = (message) => async (dispatch) => {
  const { data: newMessage } = await axios.post('/api/messages', message);

  dispatch(gotNewMessageFromServer(newMessage));
  socket.emit('new-message', newMessage);
};

export const fetchMessages = (params) => async (dispatch) => {
  const { data: messages } = await axios.get('/api/messages', { params });
  dispatch(gotMessagesFromServer(messages));
};

const initialState = {
  messages: [],
  newMessageEntry: '',
  name: '',
  language: 'en',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      const msgIds = state.messages.map((message) => message.id);
      console.log('REDUX ', action.message);
      if (msgIds.includes(action.message.id)) {
        return { ...state };
      } else {
        return { ...state, messages: [...state.messages, action.message] };
      }
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case WRITE_AUTHOR:
      return { ...state, name: action.name };
    case SET_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
};

const store = createStore(reducer, middleware);
export default store;
