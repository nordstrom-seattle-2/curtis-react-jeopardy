import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clue from './Clue/Clue';
import AnswerBox from './AnswerBox/AnswerBox';
import { clueSelected, seas } from './store/actions';
import { fetchClues } from './store/thunks';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      submittedAnswer: '',
    };
    this.getAClueCurtis();

    // this.handleAnswerInput = this.handleAnswerInput.bind(this);
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
    this.handleClueSelection = this.handleClueSelection.bind(this);
  }

  handleClueSelection(clue) {
    this.props.selectClue(clue);
  }

  handleAnswerInput = (e) => {
    this.setState({
      submittedAnswer: e.target.value
    });
  }

  handleAnswerSubmission() {
    const submitted = this.state.submittedAnswer.toLowerCase();
    const answer = this.props.selectedClue.answer.toLowerCase();
    if (submitted === answer) {
      this.setState({
        score: this.state.score + this.props.selectedClue.value,
        submittedAnswer: '',
      });
    } else {
      this.setState({
        score: this.state.score - this.props.selectedClue.value,
        submittedAnswer: '',
      });
    }
    this.props.submitAnswer();
    this.getAClueCurtis();
  }

  getAClueCurtis() {
    this.props.fetchClues();
  }

  render() {
    return (
      <div className="App">
        <h1>Jeopardy!</h1>
        <p>Score: ${this.state.score}</p>

        {
          this.props.clues.map(clue =>(
            <Clue question={clue.question}
                  categoryName={clue.category.title}
                  value={clue.value}
                  key={clue.id}
                  selected={this.props.selectedClue === clue}
                  handleClueSelection={() => this.handleClueSelection(clue)} />
          ))
        }

        <AnswerBox submittedAnswer={this.state.submittedAnswer}
                   handleAnswerInput={this.handleAnswerInput}
                   handleAnswerSubmission={this.handleAnswerSubmission}
                   visible={this.props.selectedClue !== null} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedClue: state.selectedClue,
    clues: state.clues,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectClue: clue => dispatch(clueSelected(clue)),
    submitAnswer: () => dispatch(seas()),
    fetchClues: () => dispatch(fetchClues()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
