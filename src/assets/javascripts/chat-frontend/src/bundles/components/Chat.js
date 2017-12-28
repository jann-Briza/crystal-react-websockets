import { connect } from "react-redux";
// TODO: Add loader to this page
//import Loader from "react-loader-advanced";
import * as ChatActions from "../actions/Chat";
import React from "react";
const server = new WebSocket("ws://" + "localhost" + ":" + "3000"); //the server of your websockets

class Chat extends React.Component {

    componentDidMount(){
        let self = this;
        var user = localStorage.getItem('user') || prompt("Enter your name").replace(/\:|\@/g, ""); //propmt will popup and get the user name
        localStorage.setItem('user', user); //store the user in session o local storage
        server.onmessage = function (event) {
            let data = JSON.parse(event.data); //parse the array
            self.props.handleGetMessage(data); //recieve the data from server
        };
    }

    send_message(e){
        if (e.key === "Enter") { //Check if the Enter is pressed
            let data = new Object();
            data.user = localStorage.getItem('user');
            data.message = this.props.message;
            data.time =  new Date();
            server.send(
              JSON.stringify(data)
            );
            //clear the message after sending
            this.props.clearMessage();
        }
    }

    render() {
        let messages = this.props.messages.map((data, i)=>{
            let message = JSON.parse(data) //parse object
            return (<li key={i}>{"[" + message.time + "]"} <strong>{message.user}</strong><span>: {message.message} </span></li>)
        });
        return (
            <div>
                <ul>
                    {messages}
                </ul>
                <input value={this.props.message} placeholder="Enter message" onKeyPress={this.send_message.bind(this)} onChange={this.props.handleChangeMessage.bind(this)}/>
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
