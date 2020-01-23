import React from 'react';
import TouchpointTag from './TouchpointTag';

const StudentCardBodyTouchpoint = ({currentTouchpoint, isStudentCard}) => (
    <div className={`d-flex flex-column ${isStudentCard ? "student-touchpoint" : ""}`}>
        <div className="student-touchpoint-title">Last Touchpoint</div>
        {currentTouchpoint && currentTouchpoint.comment ? (<div className="student-touchpoint-comment"><small>{currentTouchpoint.comment}</small></div>) : <div></div>}
        {currentTouchpoint && currentTouchpoint.tags ? 
            currentTouchpoint.tags.map(tag => {
                return (<TouchpointTag tagStatus={tag.status} tagText={tag.text} key={tag.text}/>)
            })
        : 
        <div></div>
        }
        {currentTouchpoint ? (<div className="blockquote-footer touchpoint-date">{timeSince(currentTouchpoint.ctime) + ' ago by ' + currentTouchpoint.userFirstName + ' ' + currentTouchpoint.userLastName} </div>) : <div></div>}
    </div>
)

function timeSince(dateString) {
    let date = new Date(dateString)
    if (!date) {
        return ''
    }
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export default StudentCardBodyTouchpoint