import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { languages } from '../lib/languages';

export default function Languages() {
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();
  return (
    <div>
      <form>
        <label>
          Languages:
          <select
            value={language}
            onChange={(e) =>
              dispatch({ type: 'SET_LANGUAGE', language: e.target.value })
            }>
            {Object.entries(languages).map((item, idx) => (
              <option value={item[0]} key={idx}>
                {item[1]}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
}
