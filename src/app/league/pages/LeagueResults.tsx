import './LeagueResults.css'

import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { LeagueReducerState } from 'src/store/league/leagueReducer'

import { fetchLeague } from '../../../store/league/leagueActions'
import LeagueResult from '../components/LeagueResult'
import LeagueResultsTitle from '../components/LeagueResultsTitle'
import LeagueContestantEntity from '../entities/LeagueContestantEntity'
import LeagueEntity from '../entities/LeagueEntity'
import LeagueResultEntity, { LeagueResultParticipant } from '../entities/LeagueResultEntity'

interface Props {
    fetchLeague: (id: number) => void,
    league: LeagueEntity | null,
    leagueResults: LeagueResultEntity[]
    leagueContestants: LeagueContestantEntity[]
    fetched: boolean
}

const LeagueResults: React.FC<Props> = ({ league, leagueResults, leagueContestants, fetched, fetchLeague: fetchLeagueAction }: Props) => {
    const [id, setId] = useState(177161)
    const [ascending, setAscending] = useState(true)

    useEffect(() => fetchLeagueAction(id), [id])

    const onIdChange = (event: ChangeEvent<HTMLInputElement>) => setId(parseInt(event.target.value, 10))
    const GetLeague = () => (
        <input type="number" step="1" placeholder={'league id'} onChange={onIdChange} value={id} style={{ lineHeight: '32px' }} />
    )

    if (league === null || leagueResults.length === 0 || leagueContestants.length === 0) {
        return (
            <div className="lr-frame">
                <div><GetLeague key='id-input' /></div>
                {
                    fetched === true
                        ? (<div>The requested league did not provide enough information to dispaly.</div>)
                        : (<div>Loading... </div>)
                }

            </div>
        )
    }

    // Prepare data for display
    const title: string = league.name ? league.name.short : 'Undefined League Title';
    const date: Date = league.timeline ? new Date(league.timeline.inProgress.begin) : new Date()
    const flipAscending = () => setAscending(!ascending)
    // Used to sort results before iterating upon the array
    const getTime = (dateString: string): number => (new Date(dateString)).getTime()
    const sortByTime =
        (x: LeagueResultEntity, y: LeagueResultEntity): number => ascending ? getTime(x.beginAt) - getTime(y.beginAt) : getTime(y.beginAt) - getTime(x.beginAt)

    // Handle more complicated data for display
    const displayLeagueResult = (result: LeagueResultEntity) => {
        // Winner first, loser second. 
        const sortedParticipants: LeagueResultParticipant[] =
            result.participants
                .sort((x: LeagueResultParticipant, y: LeagueResultParticipant) => x.place - y.place)
        const [winnerParticipant, loserParticipant] = sortedParticipants

        const [winnerContestant, loserContestant] = sortedParticipants.map((participant: LeagueResultParticipant) => {
            // ESL API returns 0 for deleted participants
            const currentContestant: LeagueContestantEntity | undefined =
                participant.id === 0 ? new LeagueContestantEntity(0, 0, '', '', 'Deleted contestant', null) : leagueContestants.find(contestant => contestant.id === participant.id)
            if (currentContestant === undefined) {
                throw new Error('Ill defined response from API')
            }
            return currentContestant
        })

        const time: string = (new Date(result.beginAt)).toLocaleTimeString('it', { hour: 'numeric', minute: 'numeric' })

        return (
            <LeagueResult
                key={result.id}
                time={time}
                winner={winnerContestant.name}
                winnerScore={winnerParticipant.points ? winnerParticipant.points[0] : -1} // Some leads have null points
                loser={loserContestant.name}
                loserScore={loserParticipant.points ? loserParticipant.points[0] : -1}
            />
        )
    }

    return (
        <div className="lr-frame">
            <GetLeague key='id-input' />
            <LeagueResultsTitle title={title} date={date} />
            <div className="lr-results-container">
                <div className="lr-button-wrapper">
                    <button className="lr-button" onClick={flipAscending}>
                        Date <div className={"arrow " + (ascending ? 'ascending' : '')} />
                    </button>
                </div>
                {leagueResults.sort(sortByTime).map(displayLeagueResult)}
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
