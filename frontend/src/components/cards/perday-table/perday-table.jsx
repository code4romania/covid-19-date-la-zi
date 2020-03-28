import React from "react"
import { Card } from "../../layout/card";
import "./perday-table.css"

export class PerDayTable extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            limit: 10,
            isLoaded: false,
            error: null,
            data: []
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
            const {state} = newProps;
            this.setState({...state});
        }
    }

    displayTable(data) {
        const {page, limit} = this.state;

        return data.slice(page * limit, limit * (page + 1)).map((row, index) => {
            return <tr key={`dailyTable${index}`}>
                <td>{ row["id"] }</td>
                <td>{ row["datePublishedString"] }</td>
                <td>{ row["infected"] }</td>
                <td>{ row["cured"] }</td>
                <td>{ row["deaths"] }</td>
            </tr>;
        });
    }

    displayPagination() {
        if (!this.state.data) {
            return null;
        }

        const {data, limit, page} = this.state;
        const shouldDisplayPagination = data.length > limit;

        if (shouldDisplayPagination) {
            return <tr>
                    <td colSpan="5">
                        <div className={"button " + (page === 0 ? "hide": "")} onClick={ e => this.changePage(-1)}>Pagina anterioara</div>
                        <div className={"button " + ((page + 1) * limit >= data.length ? "hide": "")} onClick={ e => this.changePage(1)}>Pagina urmatoare</div>
                    </td>
                </tr>
        }
    }

    changePage(inc) {
    
        const { page, data, limit} = this.state;

        if (inc < 0 && page !== 0) {
            this.setState({page: page + inc});
        }

        if (inc > 0 && ((page + inc) * limit) <= data.length) {
            this.setState({page: this.state.page + inc});
        }
    }

    render() {
        const { isLoaded, error } = this.state;
        return (
            <Card
                error={error}
                isLoaded={isLoaded}
                title="Date zilnice"
            >
                <div className="perDayTable">
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
                            { this.state.data && this.displayTable(this.state.data)}
                        </tbody>
                        <tfoot>
                            { this.displayPagination() }
                        </tfoot>
                    </table>
                </div>
            </Card>
        );
    }
}