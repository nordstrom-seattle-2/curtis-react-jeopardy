import React, { Component } from 'react';
import Clue from './Clue/Clue';
import AnswerBox from './AnswerBox/AnswerBox';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      submittedAnswer: '',
      clues: [],
      selectedClue: null,
    };
    this.getAClueCurtis();

    // this.handleAnswerInput = this.handleAnswerInput.bind(this);
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
    this.handleClueSelection = this.handleClueSelection.bind(this);
  }

  handleClueSelection(clue) {
    this.setState({ selectedClue: clue });
  }

  handleAnswerInput = (e) => {
    this.setState({
      submittedAnswer: e.target.value
    });
  }

  handleAnswerSubmission() {
    const submitted = this.state.submittedAnswer.toLowerCase();
    const answer = this.state.selectedClue.answer.toLowerCase();
    if (submitted === answer) {
      this.setState({
        score: this.state.score + this.state.selectedClue.value,
        submittedAnswer: '',
        selectedClue: null,
      });
    } else {
      this.setState({
        score: this.state.score - this.state.selectedClue.value,
        submittedAnswer: '',
        selectedClue: null,
      });
    }
    this.getAClueCurtis();
  }

  getAClueCurtis() {
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
        this.setState({
          clues: clues
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Jeopardy!</h1>
        <p>Score: ${this.state.score}</p>

        {
          this.state.clues.map(clue =>(
            <Clue question={clue.question}
                  categoryName={clue.category.title}
                  value={clue.value}
                  key={clue.id}
                  selected={this.state.selectedClue === clue}
                  handleClueSelection={() => this.handleClueSelection(clue)} />
          ))
        }

        <AnswerBox submittedAnswer={this.state.submittedAnswer}
                   handleAnswerInput={this.handleAnswerInput}
                   handleAnswerSubmission={this.handleAnswerSubmission}
                   visible={this.state.selectedClue !== null} />
      </div>
    );
  }
}

export default App;
