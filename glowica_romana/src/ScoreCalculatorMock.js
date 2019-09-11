import React from 'react';

const ScoreCalculator = ({ gameConfig }) => {
    const { romansBike, romansModules, track, obstacles, opponentModules } = gameConfig;
    return (
        <div className="center">
            <ul>
                <h2>And the winner is:</h2>
                <li>Roman's Bike: {romansBike}</li>
                <li>Roman's Modules: {romansModules}</li>
                <li>Track: {track}</li>
                <li>Obstacles: {obstacles}</li>
                <li>Opponent's modules: {opponentModules}</li>
            </ul>
        </div>
    )
}

export default ScoreCalculator;