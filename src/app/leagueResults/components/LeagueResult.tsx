import * as React from 'react'

interface Props {
    time: string,
    winner: string,
    winnerScore: string,
    loser: string,
    loserScore: string
}

const LeagueResult: React.FC<Props> =
    ({ time, winner, winnerScore, loser, loserScore}: Props) => (
        <div className={'league-result'}>
            <div className={'faded small-text'}>{time}</div>
            <div className={'float-wrapper winner'}>
                <div className={'float-left'}>{winner}</div>
                <div className={'float-right bold'}>{winnerScore}</div>
            </div>
            <div className={'float-wrapper loser'}>
                <div className={'float-left'}>{loser}</div>
                <div className={'float-right'}>{loserScore}</div>
            </div>
        </div>
    );

export default LeagueResult
