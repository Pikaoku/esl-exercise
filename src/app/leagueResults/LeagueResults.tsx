import * as React from 'react';
import {connect} from 'react-redux';
import LeagueResult from "./components/LeagueResult";
import LeagueResultsTitle from "./components/LeagueResultsTitle";
import './LeagueResults.css'

class LeagueResults extends React.Component {
    public render() {
        const results: object[] = [];

        return (
            <div className="lr-frame">
                <LeagueResultsTitle title="R6: Siege (PC) 5on5 Open Cup #55 Spain" date="21st march 2018"/>
                <div className="lr-results-container">
                    <div className="lr-button-wrapper">
                        <button className="lr-button">Date
                            <div className="arrow"/>
                        </button>
                    </div>
                    {
                        results.length === 0 &&
                        <div className="center-text">
                            No Results!
                        </div>
                    }
                    {
                        results.length > 0 &&
                        results.map(
                            (result: object, key: number) => <LeagueResult result={result} key={key}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: object) => ({});

export default connect(
    mapStateToProps,
)(LeagueResults);
