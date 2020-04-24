import React from 'react';
import { MODE_NONE, MODE_CREATE, MODE_SEARCH } from '../services/modes';

export default function ButtonWrapper(props) {
  const { mode, changeMode } = props;
  const isCreateMode = () => mode === MODE_CREATE;
  const isSearchMode = () => mode === MODE_SEARCH;

  return (
    <div>
      <button
        className={'button add ' + (isCreateMode() ? 'selected' : '')}
        onClick={() => changeMode(isCreateMode() ? MODE_NONE : MODE_CREATE)}>
      </button>
      <button
        className={'button search ' + (isSearchMode() ? 'selected' : '')}
        onClick={() => changeMode(isSearchMode() ? MODE_NONE : MODE_SEARCH)}>
        </button>
    </div>
  );
}