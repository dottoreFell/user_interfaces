import React from 'react';
import DecisionButtons from './decisionChangeButtons';

const CandidateTable = ({ candidates, setCandidateDecision, shouldDecisionChangeButtonBeActive }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>set decision</th>
                    <th>name</th>
                    <th>lastname</th>
                    <th>email</th>
                    <th>role</th>
                    <th>company</th>
                    <th>workshop</th>
                    <th>is_lecture</th>
                    <th>motivation</th>
                    <th>decision</th>
                </tr>
            </thead>
            <tbody>
                {candidates.map(({ name, lastname, email, role, company, workshop, is_lecture, motivation, decision }) => (
                    <tr key={email}>
                        <td><DecisionButtons setCandidateDecision={setCandidateDecision} decision={decision} is_lecture={is_lecture} workshop={workshop} email={email} shouldDecisionChangeButtonBeActive={shouldDecisionChangeButtonBeActive} /></td>
                        <td>{name}</td>
                        <td>{lastname}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>{company}</td>
                        <td>{workshop}</td>
                        <td>{is_lecture.toString()}</td>
                        <td>{motivation}</td>
                        <td>{decision}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CandidateTable;
