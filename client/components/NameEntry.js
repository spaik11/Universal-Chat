import React from 'react';

export default function NameEntry({ handleChange }) {
  return (
    <div>
      <form className="form-inline">
        <label htmlFor="name">Your name: </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
