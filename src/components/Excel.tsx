import React from "react";

export default class Excel extends React.Component<any, {
    data: Array<Array<string>>,
    sortBy: number | null,
    descending: boolean,
    edit: { row: number, column: number } | null,
    search: boolean,
}> {

    private preSearchData: any;
    private log: any;
    private isReplay: boolean;

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
        this.isReplay = false;
    }

    componentDidMount() {
        document.onkeydown = (e: any) => {
            if (e.altKey && e.shiftKey && e.keyCode === 82) {
                this.replay();
            }
        };
    }

    toggleSearch = (e_ignore: any) => {
        if (this.state.search) {
            this.setState({
                search: false,
                data: this.preSearchData,
            });
        } else {
            this.preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    }

    search = (e: any) => {
        const needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.preSearchData});
        }

        const index = e.target.dataset.index;
        let filteredData = this.preSearchData.filter((row: any) => {
            return row[index].toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: filteredData});
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
        return <div>
            {this.renderToolbar()}
            {this.renderTable()}
        </div>;
    }

    private renderToolbar() {
        return <button onClick={this.toggleSearch} className="toolbar">{this.state.search ? 'Suche beenden' : 'Suchen'}</button>;
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

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<{ data: Array<Array<string>>; sortBy: number | null; descending: boolean; edit: { row: number; column: number } | null; search: boolean }>, nextContext: any): boolean {
        if (!this.isReplay) {
            this.log.push(nextState);
        }
        console.log(this.log);
        return true;
    }

    private replay() {
        const log: any = Array.from(this.log);
        if (log.length === 0) {
            console.log('Noch kein Status zur Wiedergabe');
            return;
        }

        this.isReplay = true;
        let index = -1;
        let interval = setInterval(() => {
            index++;

            this.setState(log[index]);

            if (index === log.length - 1) {
                clearInterval(interval);
                this.isReplay = false;
            }
        }, 1000);
    }

}