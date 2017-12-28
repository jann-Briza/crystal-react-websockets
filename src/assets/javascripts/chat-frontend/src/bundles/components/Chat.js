import { connect } from "react-redux";
// TODO: Add loader to this page
//import Loader from "react-loader-advanced";
import * as ChatActions from "../actions/Chat";
import React from "react";
const server = new WebSocket("ws://" + "localhost" + ":" + "3000"); //the server of your websockets

class Chat extends React.Component {
    componentWillMount(){
        this.setState({
            message: '',
            messages: []
        });
    }

    componentDidMount(){
        let self = this;
        server.onmessage = function (event) {
            let data = JSON.parse(event.data);
            self.setState({
                messages: data
            });
        };
    }

    message_change(event){
        this.setState({
            message: event.target.value
        });
    }

    message_send(e){
        if (e.key === "Enter") { //Check if the Enter is pressed
            let data = new Object();
            data.user = "test";
            data.message = this.state.message;
            server.send(
              JSON.stringify(data)
            );
            //clear the message after sending
            this.setState({
                message: ''
            });
        }
    }
    render() {
        let messages = this.state.messages.map(data=>{
            let message = JSON.parse(data)
            return (<li>{message.message}</li>)
        });
        return (
            <div>
                <ul>
                    {messages}
                </ul>
                <input value={this.state.message} placeholder="Enter message" onKeyPress={this.message_send.bind(this)} onChange={this.message_change.bind(this)}/>
            </div>
        );
    }
}

Chat.propTypes = {
};

function mapStateToProps(state) {
    return state;
}

const VisibleChat = connect(
    mapStateToProps,
    ChatActions
)(Chat);

export default VisibleChat;
