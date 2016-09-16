import React from 'react'
import Display from './parts/Display'

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        //this.barGraphData = this.barGraphData.bind(this);
    }

    /*barGraphData(results) {
		return Object.keys(results).map(function(choice) {
			return {
				label: choice,
				value: results[choice]
			};
		});
	}*/

    render() {
  		return (
  			<div id="scoreboard">

  				<Display if={this.props.status === 'connected' && this.props.currentQuestion}>
  					<h3>{this.props.currentQuestion.q}</h3>
                    <p>{JSON.stringify(this.props.results)}</p>
  				</Display>

  				<Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
  					<h3>Awaiting a Question...</h3>
  				</Display>

  			</div>
  		);
  	}
}
