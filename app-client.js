import React from 'react'
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App'
import Audience from './components/Audience'
import Speaker from './components/Speaker'
import Board from './components/Board'
import NotFoundPage from './components/NotFoundPage'

render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Audience}></IndexRoute>
            <Route path="speaker" component={Speaker}></Route>
            <Route path="board" component={Board}></Route>
            <Route path="*" component={NotFoundPage}></Route>
        </Route>
    </Router>
), document.getElementById('react-container'));
