import React from "react";

export default class Excel extends React.Component<any, any> {
    displayName = "Excels";
    render() {
        let headers = this.props.headers;
        let initialData = this.props.initialData;
        return (
            <table>
                <thead>
                <tr>
                    {headers.map((title: string) =>
                        <th>{title}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {initialData.map((data: Array<string>) =>
                    <tr>
                        {data.map((field: string) =>
                            <td>{field}</td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}