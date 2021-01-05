import React from "react";

export default class Excel extends React.Component<any, {
    data: Array<Array<string>>,
    sortBy: number | null,
    descending: boolean,
    edit: { row: number, column: number } | null,
    search: boolean,
}> {

    private preSearchData: any;
    private readonly log: any;
    private logPointer: number;

    constructor(props: any) {
        super(props);
        this.state = {
            data: props.initialData,
            sortBy: null,
            descending: false,
            edit: null,
            search: false,
        };

        this.preSearchData = null;
        this.log = [this.state];
        this.logPointer = 0;
    }

    componentDidMount() {
        document.onkeydown = (event: any) => {
            const alt = event.altKey;
            const shift = event.shiftKey;

            const R = event.keyCode === 82;
            const Z = event.keyCode === 90;

            if (alt && shift && R) {
                this.replay();
            } else if (alt && shift && Z) {
                this.redo();
            } else if (alt && Z) {
                this.undo();
            }
        };
    }

    toggleSearch = (e_ignore: any) => {
        if (this.state.search) {
            this.logSetState({
                search: false,
                data: this.preSearchData,
            });
        } else {
            this.preSearchData = this.state.data;
            this.logSetState({
                search: true,
            });
        }
    }

    search = (e: any) => {
        const needle = e.target.value.toLowerCase();
        if (!needle) {
            this.logSetState({data: this.preSearchData});
        }

        const index = e.target.dataset.index;
        let filteredData = this.preSearchData.filter((row: any) => {
            return row[index].toLowerCase().indexOf(needle) > -1;
        });
        this.logSetState({data: filteredData});
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
        this.logSetState({
            data: sortedData,
            sortBy: column,
            descending: descending,
        });
    }

    showEditor = (e: any) => {
        this.logSetState({
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

        this.logSetState({
            data: data,
            edit: null,
        });
    }

    download = (format: string, event: any) => {
        const contents = format === 'json'
            ? JSON.stringify(this.state.data)
            : this.createCSV();

        const URL = window.URL || window.webkitURL;
        const blob = new Blob([contents], {type: 'text/' + format});
        event.target.href = URL.createObjectURL(blob);
        event.target.download = 'data.' + format;
    }

    private createCSV() {
        return this.state.data.reduce((result: any, row: any) => {
            return result + row.reduce((rowResult: any, cell: any, index: any) => {
                    const content = cell.replace(/"/g, '""');
                    const delimiter = index < row.length - 1 ? ';' : '';
                    return `${rowResult}"${content}"${delimiter}`;
                }, '')
                + "\n";
        }, '');
    }

    render() {
        return <div>
            {this.renderToolbar()}
            {this.renderTable()}
        </div>;
    }

    private renderToolbar() {
        return <div className="toolbar">
            <button onClick={this.toggleSearch}>{this.state.search ? 'Suche beenden' : 'Suchen'}</button>
            <a onClick={this.download.bind(this, 'json')} href="data.json">Export als JSON</a>
            <a onClick={this.download.bind(this, 'csv')} href="data.csv">Export als CSV</a>
        </div>;
    }

    private renderSearch() {
        return (<tr onChange={this.search}>
            {this.props.headers.map((_ignore: any, index: number) =>
                <td key={index}>
                    <input type="text" data-index={index}/>
                </td>)}
        </tr>);
    }

    private renderTable() {
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
                {this.state.search && this.renderSearch()}
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

    private logSetState(nextState: any) {
        this.log.push(nextState);
        this.logPointer += 1;
        this.setState(nextState);
    }

    private replay() {
        if (this.log.length === 1) {
            console.log('Noch kein Status zur Wiedergabe');
            return;
        }

        let index = -1;
        let interval = setInterval(() => {
            index++;

            this.setState(this.log[index]);

            if (index === this.log.length - 1) {
                clearInterval(interval);
            }
        }, 1000);
    }

    private undo() {
        if (this.logPointer > 0) {
            this.logPointer -= 1;
            this.setState(this.log[this.logPointer]);
        }
    }

    private redo() {
        if (this.logPointer < (this.log.length - 1)) {
            this.logPointer += 1;
            this.setState(this.log[this.logPointer]);
        }
    }

}