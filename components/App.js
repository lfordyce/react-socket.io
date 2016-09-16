import React from 'react';
import { Link } from 'react-router'
import io from 'socket.io-client'
import Header from './parts/Header'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'disconnected',
            title: '',
            member: {},
            // The member variable represents the user of this socket.
            // Every socket will have a different socket.
            audience: [],
            speaker: '',
            questions: [],
            currentQuestion: false,
            results: {}
        };
        this.emit = this.emit.bind(this);
    }

    componentWillMount() {
        // this refers to the instance of our App.js component.
        this.socket = io('http://localhost:3000');

        // socket status connected
        this.socket.on('connect', () => {

            // Refresh check to see if member was saved to sessionStorage.
            var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

            if (member && member.type === 'audience') {
                this.emit('join', member);
            } else if (member && member.type === 'speaker') {
                this.emit('start', {
                    name: member.name,
                    title: sessionStorage.title
                });
            }

            this.setState({
                status: 'connected'
            });
        });

        // socket status disconnected
        this.socket.on('disconnect', () => {
            this.setState({
                status: 'disconnected',
                title: 'disconnected',
                speaker: ''
            });
        });

        this.socket.on('welcome', x => this.setState(x));

        this.socket.on('joined', (member) => {
            sessionStorage.member = JSON.stringify(member);
            // turn member object, who has joined, into a JSON string.
            this.setState({
                member: member
            });
        });

        this.socket.on('audience', (newAudience) => {
            this.setState({
                audience: newAudience
            });
        });

        this.socket.on('start', (presentation) => {
            if (this.state.member.type === 'speaker') {
                sessionStorage.title = presentation.title;
            }
            this.setState(presentation);
        });

        this.socket.on('end', x => this.setState(x));

        this.socket.on('ask', (question) => {
            sessionStorage.answer = '';
            this.setState({
                currentQuestion: question
            });
        });

        this.socket.on('results', (data) => {
            this.setState({results: data});
        });
    }

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    render() {
        return (
            <div>
                <Header {...this.state}/>
                {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {
                            ...this.state,
                            emit: this.emit
                        });
                    })
                }
            </div>
        );
    }
}
