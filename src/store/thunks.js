import { cluesLoaded } from './actions';

export function fetchClues() {
  return dispatch => {
    Promise.all([
      fetch('http://jservice.io/api/random'),
      fetch('http://jservice.io/api/random'),
      fetch('http://jservice.io/api/random'),
    ])
      .then(responses => {
        return Promise.all([
          responses[0].json(),
          responses[1].json(),
          responses[2].json(),
        ]);
      })
      .then(clueArrays => clueArrays.map(arr => arr[0]))
      .then(clues => {
        // this.props.cluesFetched(clues);
        dispatch(cluesLoaded(clues));
      });
  };
}
