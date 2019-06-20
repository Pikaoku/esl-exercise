import './LeagueResults.css'

import React, { useEffect, useState } from 'react'
import { Component, createRef, RefObject } from 'react'

import { fetchLeague } from '../../../store/league/leagueActions'
import LeagueEntity from '../entities/LeagueEntity'
import LeagueResultEntity from '../entities/LeagueResultEntity'

, { }
interface Props {
    fetchLeague: (id: number) => void,
    league: LeagueEntity | null,
    leagueResult: LeagueResultEntity | null
    leagueContestant: LeagueContestantEntity | null
}

// class LeagueResults extends Component<Props, State> {
//     private leagueIdInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

// }

const LeagueResults = ({ league, leagueResult, leagueContestant, fetchLeague }: Props) => {
    // Variables

    const [id, setId] = useState(177161)
    const [ascending, setAscending] = useState(true)

    useEffect(() => fetchLeague(177161), [])

    if (!league || !leagueResult || !leagueContestant) {
        return (<div>Loading...</div>)
    }

    // Prepare data for display
    const title: string = league.name.short;
    const dateRaw: Date = new Date(league.timeline.inProgress.begin)
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    const date: string = dateRaw.toLocaleDateString('en-us', dateOptions)
    const flipAscending = () => setAscending(!ascending)
    
    // Used to sort results before iterating upon the array
    const getTime = (input: string): number => (new Date(input)).getTime()
    const sortByTime =
        (x: any, y: any): number =>
            ascending ? getTime(x.beginAt) - getTime(y.beginAt) : getTime(y.beginAt) - getTime(x.beginAt)

    // Handle more complicated data for display
    const displayLeagueResult = (result: LeagueResultEntity) => {
        // Winner first, loser second. 
        const sortedParticipants: any[] = result.participants.sort((x: any, y: any) => x.place - y.place);
        const time: string =
            (new Date(result.beginAt)).toLocaleTimeString('it', { hour: 'numeric', minute: 'numeric' })
        const getParticipantName = (pid: number): string => league.contestants.find((x: any) => x.id === pid).name;
        const getParticipantPoints = (participant: any): string => participant.points[0]
        const winner: any = sortedParticipants[0];
        const loser: any = sortedParticipants[1]

        return (
            <LeagueResult
                key={result.id}
                time={time}
                winner={getParticipantName(winner.id)}
                winnerScore={getParticipantPoints(winner)}
                loser={getParticipantName(loser.id)}
                loserScore={getParticipantPoints(loser)}
            />
        )
    }

    return (
        <div className="lr-frame">
            <input ref={this.leagueIdInput} type="text" placeholder={'league id'} />
            <button onClick={this.changeLeague}>retrieve league</button>
            <LeagueResultsTitle title={title} date={date} />
            <div className="lr-results-container">
                <div className="lr-button-wrapper">
                    <button className="lr-button" onClick={flipAscending}>
                        Date <div className={"arrow " + (ascending ? 'ascending' : '')} />
                    </button>
                </div>
                {
                    league.results.length > 0 && league.contestants.length > 0
                        ? league.results.sort(sortByTime).map(displayLeagueResult)
                        : <div className={'center-text'}>Results Loading...</div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state: { league: LeagueReducerState }) => ({
    ...state.league
});

export default connect(
    mapStateToProps,
    { fetchLeague }
)(LeagueResults);
