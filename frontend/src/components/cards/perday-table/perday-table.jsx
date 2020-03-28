import React from "react"
import { Card } from "../../layout/card";

export class PerDayTable extends React.PureComponent {

    displayTable(data) {
        return data.map((row, index) => {
            return <tr key={`dailyTable${index}`}>
                <td>{ index + 1 }</td>
                <td>{ row["datePublishedString"] }</td>
                <td>{ row["infected"] }</td>
                <td>{ row["cured"] }</td>
                <td>{ row["deaths"] }</td>
            </tr>;
        });
    }

    render() {
        const { state } = this.props;
        return (
            <Card
                error={state.error}
                isLoaded={state.isLoaded}
                title="Date zilnice"
            >
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>Infectati</th>
                            <th>Vindecati</th>
                            <th>Decedati</th>
                        </tr>
                    </thead>
                    <tbody>
                        { state.data && this.displayTable(state.data)}
                    </tbody>
                    <tfoot>
                        
                    </tfoot>
                </table>
            </Card>
        );
    }
}