import React from 'react';
import CandidateList from './CandidateList'
import ChoiceButtons from './choiceButtons'
import AddCandidateForm from './addCandidateForm'

class App extends React.PureComponent {

  state = {
    showSubPage: 1
  }

  whichComponentShouldIShow = (componentNumber) => {
    this.setState({
      showSubPage: componentNumber
    })
  }

  render() {
    return (
      <div className="App">
        <ChoiceButtons whichComponentShouldIShow={this.whichComponentShouldIShow} />
        {(this.state.showSubPage === 0) && <CandidateList />}
        {(this.state.showSubPage === 1) && <AddCandidateForm />}
      </div>
    );
  }
};

export default App;
