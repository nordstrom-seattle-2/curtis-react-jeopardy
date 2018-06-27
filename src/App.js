import React, { Component } from 'react';
import Clue from './Clue/Clue';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      submittedAnswer: '',
      clues: [],
    };
    this.getAClueCurtis();

    // this.handleAnswerInput = this.handleAnswerInput.bind(this);
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
  }

  handleAnswerInput = (e) => {
    this.setState({
      submittedAnswer: e.target.value
    });
  }

  handleAnswerSubmission() {
    const submitted = this.state.submittedAnswer.toLowerCase();
    const answer = this.state.answer.toLowerCase();
    if (submitted === answer) {
      this.setState({
        score: this.state.score + this.state.value,
        submittedAnswer: ''
      });
    } else {
      this.setState({
        score: this.state.score - this.state.value,
        submittedAnswer: ''
      });
    }
    this.getAClueCurtis();
  }

  getAClueCurtis() {
    fetch('http://jservice.io/api/random')
      .then(response => response.json())
      // .then(clues => clues[0])
      .then(clues => {
        this.setState({
          clues: clues
          // question: clue.question,
          // answer: clue.answer,
          // value: clue.value,
          // categoryName: clue.category.title,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Jeopardy!</h1>
        <p>Score: ${this.state.score}</p>

        {/*<Clue question={this.state.question}
              categoryName={this.state.categoryName}
              value={this.state.value} />*/}

        {
          this.state.clues.map(clue =>(
            <Clue question={clue.question}
                  categoryName={clue.category.title}
                  value={clue.value} />
          ))
        }

        <p>
          <input type="text"
                 placeholder="your answer here"
                 value={this.state.submittedAnswer}
                 onChange={this.handleAnswerInput}/>
        </p>
        <p>
          <button onClick={this.handleAnswerSubmission}
                  disabled={this.state.submittedAnswer.length === 0}>
            Submit answer
          </button>
        </p>
      </div>
    );
  }
}

export default App;
