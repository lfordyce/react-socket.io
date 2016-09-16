import React from 'react'

export default class JoinSpeaker extends React.Component {

  constructor(props) {
    super(props);
    this.start= this.start.bind(this);
  }

  start() {
    console.log(this.refs.name.value);

    this.props.emit('start', {
        name: this.refs.name.value,
        title: this.refs.title.value
    });
  }

  render() {
		return (
      <form action="javascript:void(0)" onSubmit={this.start}>
				<label>Full Name</label>
				<input ref="name"
					   className="form-control"
				       placeholder="enter your full name..."
                       required />

                <label>Presentation Title</label>
				<input ref="title"
					   className="form-control"
                       placeholder="enter your full name..."
                       required />
				<button className="btn btn-primary">Join</button>
			</form>
		);
	}
}
