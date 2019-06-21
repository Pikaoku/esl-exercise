import * as React from 'react'

interface LeagueResultsTitleProps {
    title: string,
    date: Date
}

const LeagueResultsTitle: React.StatelessComponent<LeagueResultsTitleProps> =

    ({ title, date }: LeagueResultsTitleProps) => {
        const formattedDate: string = date.toLocaleDateString('en-us', { day: 'numeric', month: 'long', year: 'numeric' })

        return (
            <div className="lr-title-container">
                <h2 className="lr-title">{title}</h2>
                <h4 className="lr-subtitle">{formattedDate}</h4>
            </div>
        );
    }

export default LeagueResultsTitle
