import React from "react";

export default class Excel extends React.Component<any, { data: Array<Array<string>> }> {
    constructor(props: any) {
        super(props);
        this.state = {data: props.initialData};
    }

    sort = (e: any) => {
        const column = e.target.cellIndex;
        const data = Array.from(this.state.data);
        const sortedData = data.sort((a: Array<string>, b: Array<string>) => {
            return a[column] < b[column] ? -1 : 1;
        });
        this.setState({data: sortedData});
    }

    render() {
        let headers = this.props.headers;
        let data = this.state.data;
        return (
            <table>
                <thead onClick={this.sort}>
                <tr>
                    {headers.map((title: string, idx: number) =>
                        <th key={idx}>{title}</th>
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