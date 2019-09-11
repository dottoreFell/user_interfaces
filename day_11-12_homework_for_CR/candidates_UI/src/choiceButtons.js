import React from 'react';

const choiceButtons = ({ whichComponentShouldIShow }) => {
    return (
        <div>
            <p>
                <button onClick={() => whichComponentShouldIShow(0)}>Show Candidate List</button>
                <button onClick={() => whichComponentShouldIShow(1)}>Add New Candidate</button>
            </p>
        </div>
    )
}

export default choiceButtons;
