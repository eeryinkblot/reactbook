import React from "react";

class TextAreaCounter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: this.props.defaultText,
        }
    }

    onTextChange = (e: any) => {
        this.setState({
            text: e.target.value,
        });
    }

    render() {
        return (
            <div>
                <textarea value={this.state.text} onChange={this.onTextChange} />
                <h3>{this.state.text.length}</h3>
            </div>
        );
    }
}

export default TextAreaCounter;