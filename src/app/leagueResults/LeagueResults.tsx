import * as React from 'react';
import { Component, createRef, RefObject } from 'react';
import { connect } from 'react-redux';
import { fetchLeague } from "../../store/league/leagueActions";
import { League } from "../../store/league/leagueTypes";
import LeagueResult from './components/LeagueResult';
import LeagueResultsTitle from "./components/LeagueResultsTitle";
import './LeagueResults.css';

interface Props {
    fetchLeague: (id: string) => Promise<void>,
    leagues: object
}

interface State {
    ascending: boolean,
    id: string
}

class LeagueResults extends Component<Props, State> {
    private leagueIdInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            ascending: true,
            id: '177161'
        };
        this.changeLeague = this.changeLeague.bind(this);
    }

    public componentDidMount() {
        // This usually would come from the URL or the container of this component
        this.props.fetchLeague('177161');
    }

    public render() {
        const { id } = this.state;
        const { leagues } = this.props;
        const league: League = leagues[id];

        if (typeof league === 'undefined' || league.fetched === false) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        const title: string = league.data.name.short;
        const dateRaw: Date = new Date(league.data.timeline.inProgress.begin);
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const date: string = dateRaw.toLocaleDateString('en-us', dateOptions);

        const displayLeagueResult = (result: any) => {
            // Winner first, loser second. 
            const sortedParticipants: any[] = result.participants.sort((x: any, y: any) => x.place - y.place);
            const time: string =
                (new Date(result.beginAt)).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })
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
                        <button className="lr-button">Date
                            <div className="arrow" />
                        </button>
                    </div>
                    {
                        (league.results.length > 0 && league.contestants.length > 0)
                            ? league.results.map(displayLeagueResult)
                            : <div className={'center-text'}>Results Loading...</div>
                    }
                </div>
            </div>
        );
    }

    private changeLeague = () => {
        if (this.leagueIdInput.current) {
            const newId: string = this.leagueIdInput.current.value;
            this.setState({ id: newId });
            this.props.fetchLeague(newId);
        }
    };
}

const mapStateToProps = (state: any) => ({
    leagues: state.league.leagues
});

export default connect(
    mapStateToProps,
    { fetchLeague }
)(LeagueResults);
