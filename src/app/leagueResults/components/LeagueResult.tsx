import * as React from "react";

interface ILeagueResultProps {
    result: object
}

const LeagueResult: React.StatelessComponent<ILeagueResultProps> =
    ({result}: ILeagueResultProps) => (
        <div>
            Hello there
        </div>
    );

export default LeagueResult