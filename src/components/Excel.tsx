import React from "react";

export default class Excel extends React.Component<any, {
    data: Array<Array<string>>,
    sortBy: number | null,
    descending: boolean,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: props.initialData,
            sortBy: null,
            descending: false,
        };
    }

    sort = (e: any) => {
        const column = e.target.cellIndex;
        const data = Array.from(this.state.data);

        const descending = this.state.sortBy === column && !this.state.descending;
        const sortedData = data.sort((a: Array<string>, b: Array<string>) => {
            return descending
                ? a[column] < b[column] ? 1 : -1
                : a[column] > b[column] ? 1 : -1;
        });
        this.setState({
            data: sortedData,
            sortBy: column,
            descending: descending,
        });
    }

    render() {
        let headers = this.props.headers;
        let data = this.state.data;
        return (
            <table>
                <thead onClick={this.sort}>
                <tr>
                    {headers.map((title: string, idx: number) =>
                        <th key={idx}>{title}{
                            this.state.sortBy === idx && (this.state.descending && ' \u2193' || !this.state.descending && ' \u2191')
                        }</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {data.map((row: Array<string>, index: number) =>
                    <tr key={index}>
                        {row.map((cell: string, index: number) =>
                            <td key={index}>{cell}</td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}