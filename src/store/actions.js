export const CLUES_LOADED = '[Clues] Loaded';
export const CLUE_SELECTED = '[Clue] Selected';
export const SELECTION_EXECUTION_ANSWER_SUBMITTED = '[Answer] Submitted and executed and selecteded';

export function cluesLoaded(clues) {
  return {
    type: CLUES_LOADED,
    clues
  };
}

export function clueSelected(clue) {
  return {
    type: CLUE_SELECTED,
    clue,
  };
}

export function seas() {
  return {
    type: SELECTION_EXECUTION_ANSWER_SUBMITTED
  };
}
