import React from 'react';

const FilterButtons = ({ showAllCandidates, showCandidatesForLecture, showCandidatesForAnyWorkshop, showCandidatesForSelectedWorkshop, selectWorkshopNumber }) => {
    return (
        <div>
            <p>
                <button onClick={showAllCandidates}>All Candidates</button>
                <button onClick={showCandidatesForLecture}>Candidates for Lecture</button>
                <button onClick={showCandidatesForAnyWorkshop}>Candidates for Workshops</button>
                <button onClick={showCandidatesForSelectedWorkshop}>Candidates for Selected Workshop: </button>
                <select onChange={selectWorkshopNumber}>
                    <option value="1">Workshop 1</option>
                    <option value="2">Workshop 2</option>
                    <option value="3">Workshop 3</option>
                    <option value="4">Workshop 4</option>
                    <option value="5">Workshop 5</option>
                </select>
            </p>
        </div>
    )
}

export default FilterButtons;
