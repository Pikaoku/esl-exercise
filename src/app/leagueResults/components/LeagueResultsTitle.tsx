import * as React from "react";

interface LeagueResultsTitleProps {
    title: string,
    date: string
}

const LeagueResultsTitle: React.StatelessComponent<LeagueResultsTitleProps> =
    ({title, date}: LeagueResultsTitleProps) => (
        <div className="lr-title-container">
            <h2 className="lr-title">{title}</h2>
            <h3 className="lr-subtitle">{date}</h3>
        </div>
    );

export default LeagueResultsTitle
