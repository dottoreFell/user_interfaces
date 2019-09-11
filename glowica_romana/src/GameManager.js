import React from 'react';
import { Bikes, Modules, Tracks, Obstacles } from './enums';
import { NumberOfSlots } from './NumberOfSlots';

class GameManager extends React.PureComponent {
  state = {
    gameConfig: {
      romansBike: [],
      romansModules: [],
      track: [],
      obstacles: [],
      opponentModules: []
    }
  }

  genSetupBttns = (availableOptions, gameStateArrayName) => {
    return Object.values(availableOptions).map((optionType, id) => (<button key={id} onClick={() => this.addSlot(gameStateArrayName, optionType)} disabled={this.shouldButtonBeDisabled(gameStateArrayName)}>{optionType}</button>))
  }

  shouldButtonBeDisabled = (button) => {

    switch (button) {
      case 'romansBike':
        return (this.state.gameConfig.romansBike.length > 0);

      case 'romansModules':
        return (this.state.gameConfig.romansBike.length === 0
          || this.state.gameConfig.romansModules.length === NumberOfSlots[this.state.gameConfig.romansBike[0]].maxSlots)

      case 'track':
        return (this.state.gameConfig.track.length > 0);

      case 'obstacles':
        return (this.state.gameConfig.track.length === 0
          || this.state.gameConfig.obstacles.length === NumberOfSlots[this.state.gameConfig.track[0]].maxSlots)

      case 'opponentModules':
        return (this.state.gameConfig.opponentModules.length > 4);

      case 'start':
        return (this.state.gameConfig.romansBike.length === 0 || this.state.gameConfig.track.length === 0 || this.state.gameConfig.obstacles.length < NumberOfSlots[this.state.gameConfig.track[0]].minSlots);

      case 'reset':
        return (Object.values(this.state.gameConfig).map(gameStateArray => gameStateArray.length).reduce((totalLength, gameStateArray) => totalLength + gameStateArray) === 0);


      default: return true
    }
  }

  genStateBttns = (gameStateArrayContent, gameStateArrayName) => {
    return gameStateArrayContent.map((option, id) => (<button key={id} onClick={() => this.removeSlot(gameStateArrayName, id)}>{option}</button>))
  }

  addSlot = (gameStateArrayName, optionType) => {
    this.props.setScoreCalcVisiblity(false);
    const gameStateArrayCopy = [...this.state.gameConfig[gameStateArrayName]]
    gameStateArrayCopy.push(optionType);
    this.setState({
      gameConfig: { ...this.state.gameConfig, [gameStateArrayName]: gameStateArrayCopy }
    })
  }

  removeSlot = (gameStateArrayName, id) => {
    this.props.setScoreCalcVisiblity(false);
    const newRomansModules = gameStateArrayName === 'romansBike' ? [] : [...this.state.gameConfig.romansModules];
    const newObstacles = gameStateArrayName === 'track' ? [] : [...this.state.gameConfig.obstacles];

    const gameStateArrayCopy = [...this.state.gameConfig[gameStateArrayName]]
    gameStateArrayCopy.splice(id, 1);
    this.setState({
      gameConfig: { ...this.state.gameConfig, obstacles: newObstacles, romansModules: newRomansModules, [gameStateArrayName]: gameStateArrayCopy }
    })
  }

  startGame = (passedGameConfig) => {
    this.props.setScoreCalcVisiblity(true);
    this.props.setGameConfig(passedGameConfig);
  }

  resetGame = () => {
    this.props.setScoreCalcVisiblity(false);
    const clearGameConfig = { ...this.state.gameConfig };
    Object.keys(clearGameConfig).map(item => clearGameConfig[item] = []);
    this.setState({
      gameConfig: { ...clearGameConfig }
    })
  }

  render() {
    const { romansBike, romansModules, track, obstacles, opponentModules } = this.state.gameConfig;
    return (
      <div>
        <div id="GameManagingButtons">
          <button onClick={() => this.startGame(this.state.gameConfig)} disabled={this.shouldButtonBeDisabled('start')}>Start Game</button>
          <button onClick={this.resetGame} disabled={this.shouldButtonBeDisabled('reset')}>Reset Game</button>
        </div>
        <div id="GameConfigButtons">
          <ul>
            <li>Select Bike: {this.genSetupBttns(Bikes, 'romansBike')}</li>
            <li>Select Roman's Modules: {this.genSetupBttns(Modules, 'romansModules')}</li>
            <li>Select Track: {this.genSetupBttns(Tracks, 'track')}</li>
            <li>Select Obstacles: {this.genSetupBttns(Obstacles, 'obstacles')}</li>
            <li>Select Opponent's Modules: {this.genSetupBttns(Modules, 'opponentModules')}</li>
          </ul>
        </div>
        <div id="CurrentGameConfig">
          <ul>
            <li>Roman's Bike: {this.genStateBttns(romansBike, 'romansBike')}</li>
            <li>Roman's Modules: {this.genStateBttns(romansModules, 'romansModules')}</li>
            <li>Track: {this.genStateBttns(track, 'track')}</li>
            <li>Obstacles: {this.genStateBttns(obstacles, 'obstacles')}</li>
            <li>Opponent's Modules: {this.genStateBttns(opponentModules, 'opponentModules')}</li>
          </ul>
        </div>
      </div>
    );
  }
}


export default GameManager;