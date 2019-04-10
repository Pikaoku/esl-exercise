import * as React from 'react';
import {Component,createRef, RefObject}  from 'react';
import {connect} from 'react-redux';
import {fetchLeague} from "../../store/league/leagueActions";
import {League} from "../../store/league/leagueTypes";
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
        const {id} = this.state;
        const {leagues} = this.props;
        const league: League = leagues[id];

        if (typeof league === 'undefined' || league.fetched === false) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        // tslint:disable-next-line:no-console
        console.log('id', id, 'leagues', leagues, 'league', league);

        return (
            <div className="lr-frame">
                <input ref={this.leagueIdInput} type="text" placeholder={'league id'}/>
                <button onClick={this.changeLeague}>retrieve league</button>
                <LeagueResultsTitle title={league.data.name.short} date="21st march 2018"/>
                <div className="lr-results-container">
                    <div className="lr-button-wrapper">
                        <button className="lr-button">Date
                            <div className="arrow"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private changeLeague = () => {
        // for demonstration purposes, ideally this would be handled by some state
        if (this.leagueIdInput.current) {
            const newId: string = this.leagueIdInput.current.value;
            this.setState({id: newId});
            this.props.fetchLeague(newId);
        }
    
    };
}

const mapStateToProps = (state: any) => ({
    leagues: state.league.leagues
});

export default connect(
    mapStateToProps,
    {fetchLeague}
)(LeagueResults);
