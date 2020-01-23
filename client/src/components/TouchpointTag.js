import React from 'react';

export default ({tagStatus, tagText}) => {

    switch (tagStatus) {
        case 'green': return (<span className="badge badge-success mr-auto my-1">{tagText}</span>)
        case 'yellow': return (<span className="badge badge-warning mr-auto my-1">{tagText}</span>)
        case 'red': return (<span className="badge badge-danger mr-auto my-1">{tagText}</span>)
        default : return (<span className="badge badge-dark mr-auto my-1">{tagText}</span>)
    }

}