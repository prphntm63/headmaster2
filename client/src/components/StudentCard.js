import React, { Component } from 'react';

class StudentCard extends Component {
    render() {
        return (<h3>{this.props.student.github}</h3>)
    }
}

export default StudentCard