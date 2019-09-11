import React from 'react';
import CandidateTable from './ShowCandidates';
import FilterButtons from './filterButtons';

class CandidateList extends React.PureComponent {

  state = {
    selectedWorkshop: '1',
    candidates: [],
    getCandidatesUrl: 'http://localhost:3001/candidates'
  }

  componentDidMount() {
    this.fetchMyCandidates()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.getCandidatesUrl !== this.state.getCandidatesUrl) this.fetchMyCandidates()
  }

  fetchMyCandidates = () => {
    fetch(this.state.getCandidatesUrl)
      .then(response => response.json())
      .then(response => this.setState({
        candidates: response
      }))
  }

  setCandidateDecision = (email, decision) => {
    fetch('http://localhost:3001/candidates/decide', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "email": email, "decision": decision })
    })
      .then(response => (response.text()))
      .then(resp => alert(resp))
      .then(() => this.fetchMyCandidates())
  }

  showAllCandidates = () => {
    this.setState({
      getCandidatesUrl: 'http://localhost:3001/candidates'
    })
  }

  showCandidatesForLecture = () => {
    this.setState({
      getCandidatesUrl: 'http://localhost:3001/candidates/lecture'
    })
  }

  showCandidatesForLectureAndWorkshop = () => {
    this.setState({
      getCandidatesUrl: 'http://localhost:3001/candidates/lectureandworkshop'
    })
  }

  showCandidatesForAnyWorkshop = () => {
    this.setState({
      getCandidatesUrl: 'http://localhost:3001/candidates/workshop'
    })
  }

  selectWorkshopNumber = (event) => {
    this.setState({
      selectedWorkshop: event.target.value,
    })
  }

  showCandidatesForSelectedWorkshop = () => {
    this.setState({
      filteredWorkshop: parseInt(this.state.selectedWorkshop),
      getCandidatesUrl: 'http://localhost:3001/candidates/workshopnumber/' + this.state.selectedWorkshop,
    })
  }

  shouldDecisionChangeButtonBeActive = (newDecision, currentDecision, is_lecture, workshop) => {
    const userStates = Object.freeze({ "none": null, "accLec": "ACC_LEC", "accWor": "ACC_WOR", "mvLec": "MV_LEC", "rejected": "rejected" })
    const initialDecisionsForMvLec = [userStates.none, userStates.rejected, userStates.accWor];
    const initialDecisionsForAccWor = [userStates.none, userStates.rejected, userStates.mvLec];
    const initialDecisionsForAccLec = [userStates.none, userStates.rejected];

    switch (newDecision) {
      case userStates.mvLec:
        return (initialDecisionsForMvLec.includes(currentDecision) && workshop !== 0 && is_lecture);

      case userStates.accWor:
        return (initialDecisionsForAccWor.includes(currentDecision) && workshop !== 0);

      case userStates.accLec:
        return (initialDecisionsForAccLec.includes(currentDecision) && workshop === 0 && is_lecture);

      case userStates.rejected:
        return currentDecision !== newDecision;

      default:
        return false;
    }
  }

  render() {
    return (
      <div className="CandidateList">
        <FilterButtons showAllCandidates={this.showAllCandidates} showCandidatesForLecture={this.showCandidatesForLecture} showCandidatesForAnyWorkshop={this.showCandidatesForAnyWorkshop} showCandidatesForSelectedWorkshop={this.showCandidatesForSelectedWorkshop} selectWorkshopNumber={this.selectWorkshopNumber} />
        <CandidateTable candidates={this.state.candidates} setCandidateDecision={this.setCandidateDecision} shouldDecisionChangeButtonBeActive={this.shouldDecisionChangeButtonBeActive} />
      </div>
    );
  }
};

export default CandidateList;
