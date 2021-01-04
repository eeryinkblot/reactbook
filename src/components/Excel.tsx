import React from "react";

export default class Excel extends React.Component<any, {
    data: Array<Array<string>>,
    sortBy: number | null,
    descending: boolean,
    edit: { row: number, column: number } | null,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: props.initialData,
            sortBy: null,
            descending: false,
            edit: null,
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

    showEditor = (e: any) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                column: e.target.cellIndex,
            }
        });
    }

    save = (e: any) => {
        e.preventDefault();

        const input = e.target.firstChild;
        const data = Array.from(this.state.data);

        if (this.state.edit) {
            data[this.state.edit.row][this.state.edit.column] = input.value;
        }

        this.setState({
            data: data,
            edit: null,
        });
    }

    render() {
        const headers = this.props.headers;
        const data = this.state.data;
        const edit = this.state.edit;

        let icon: any = null;
        if (this.state.descending) {
            icon = ' \u2193';
        } else {
            icon = ' \u2191';
        }

        const headerElements =
            headers.map((title: string, index: number) =>
                <th key={index}>{title}{this.state.sortBy === index && icon}</th>
            );

        return (
            <table>
                <thead onClick={this.sort}>
                <tr>
                    {headerElements}
                </tr>
                </thead>
                <tbody onDoubleClick={this.showEditor}>
                {data.map((row: Array<string>, rowIndex: number) =>
                    <tr key={rowIndex}>
                        {row.map((content: string, index: number) =>
                            <td key={index} data-row={rowIndex}>
                                {edit && edit.row === rowIndex && edit.column === index &&
                                <form onSubmit={this.save}>
                                    <input type="text" defaultValue={content}/>
                                </form>
                                }
                                {edit && (edit.row !== rowIndex || edit.column !== index) && content}
                                {!edit && content}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}