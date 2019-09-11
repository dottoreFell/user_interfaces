import React from 'react';

const DecisionButtons = ({ setCandidateDecision, shouldDecisionChangeButtonBeActive, decision, workshop, is_lecture, email }) => {
    return (
        <div>
            <p>
                <button disabled={!shouldDecisionChangeButtonBeActive('MV_LEC', decision, is_lecture, workshop)} onClick={() => { setCandidateDecision(email, 'MV_LEC') }}>MV_LEC</button>
                <button disabled={!shouldDecisionChangeButtonBeActive('ACC_WOR', decision, is_lecture, workshop)} onClick={() => { setCandidateDecision(email, 'ACC_WOR') }}>ACC_WOR</button>
                <button disabled={!shouldDecisionChangeButtonBeActive('ACC_LEC', decision, is_lecture, workshop)} onClick={() => { setCandidateDecision(email, 'ACC_LEC') }}>ACC_LEC</button>
                <button disabled={!shouldDecisionChangeButtonBeActive('rejected', decision, is_lecture, workshop)} onClick={() => { setCandidateDecision(email, 'rejected') }}>Rej</button>
            </p>
        </div>
    )
}

export default DecisionButtons;
