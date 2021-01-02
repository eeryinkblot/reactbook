import React from "react";

export default class LoggedComponent extends React.Component<any, any> {

    componentDidMount() {
        LoggedComponent.log("componentDidMount", arguments);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        LoggedComponent.log("componentDidUpdate", arguments);
    }

    componentWillUnmount() {
        LoggedComponent.log("componentWillUnmount", arguments);
    }

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        LoggedComponent.log("shouldComponentUpdate", arguments);
        return true;
    }

    private static log(name: string, args: any) {
        console.log(arguments);
    }

}