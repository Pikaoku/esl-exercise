import * as React from 'react';
import {connect} from 'react-redux';
import './LeagueResults.css'

class LeagueResults extends React.Component {
    public render() {
        const results: object[] = [];

        interface ILeagueTitleProps {
            title: string,
            date: string
        }

        const LeagueTitle: React.SFC<ILeagueTitleProps> = ({title, date}: ILeagueTitleProps) => (
            <div className="lr-title-container">
                <h2 className="lr-title">{title}</h2>
                <h3 className="lr-subtitle">{date}</h3>
            </div>
        );

        interface ILeagueResultProps {
            result: object
        }

        const LeagueResult: React.SFC<ILeagueResultProps> =
            ({result}: ILeagueResultProps) => (
                <div>
                    <div>la lal a</div>

                </div>
            );

        return (
            <div className="lr-frame">
                <LeagueTitle title="R6: Siege (PC) 5on5 Open Cup #55 Spain" date="21st march 2018"/>
                <div className="lr-results-container">
                    <div className="lr-select-wrapper">
                        <select className="lr-select">
                            <option>date</option>
                        </select>
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
