import './App.css';
import React from 'react';
import ScoreCalculator from './ScoreCalculatorMock';
import GameManager from './GameManager';

class App extends React.PureComponent {
  state = {
    gameConfig: {
      romansBike: '',
      romansModules: [],
      track: '',
      obstacles: [],
      opponentModules: []
    },
    isScoreCalculatorVisible: false
  }

  setScoreCalcVisiblity = isScoreCalculatorVisible => {
    this.setState({
      isScoreCalculatorVisible
    })
  }

  setGameConfig = gameConfigReceived => {
    this.setState({
      gameConfig: {...gameConfigReceived}
    })
  }

  render() {
    return (
      <div className="App">
        <GameManager setGameConfig={this.setGameConfig} setScoreCalcVisiblity={this.setScoreCalcVisiblity}/>
        {this.state.isScoreCalculatorVisible && <ScoreCalculator gameConfig={this.state.gameConfig} />}
      </div>
    );
  }
}

export default App;