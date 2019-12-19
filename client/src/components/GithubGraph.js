import React from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const GraphSquare = ({commitDay, idx}) => (
    <React.Fragment>
        {idx%7 === 0 ? <div className="graph-item graph-item-header">{'#' + (Math.floor(idx/7)+1)}</div> : ''}
        {commitDay.commits.length ? 
            (<OverlayTrigger key="" placement="bottom" overlay={
                <Tooltip>
                    <table>
                        <tbody>
                            <tr><td align="right">Commits:</td><td align="left" style={{'paddingLeft':'5px'}}>{commitDay.commits.length}</td></tr>
                            <tr><td align="right">Lines:</td><td align="left" style={{'paddingLeft':'5px'}}>{commitDay.total}</td></tr>
                            <tr><td align="right">Repos:</td><td align="left" style={{'paddingLeft':'5px'}}>{commitDay.repos ? commitDay.repos.length : 0}</td></tr>
                        </tbody>
                    </table>
                </Tooltip>
            }>
                <div className={`graph-item ${ 
                    commitDay.commits.length < 4 ?
                    ['no', 'sm', 'md', 'lg', 'xl'][commitDay.commits.length]
                    : 
                    'xl'
                    }-commits`}></div>
            </OverlayTrigger>)
        :
            (<div className={`graph-item no-commits`} />)
        }
    </React.Fragment>
)

export default ({student}) => (
    <div className="graph-container">
        {['','','M','','W','','F',''].map((headerDay, idx) => {
            return (<div className="graph-item graph-item-header" key={headerDay + idx}>{headerDay}</div>)})
        }
        {parseCommits(student.commits, student).commits.map((commitDay, idx) => {
            return (<GraphSquare commitDay={commitDay} idx={idx} key={idx} />)
        })}
    </div>
)

function parseCommits(commits, student) {
    if (!commits.length) return null

    let today = new Date()
    let dayOfWeek = today.getDay()
    let commitsArray = []
    let lastCommit = null

    // Show 4 weeks max
    for (let idx=(21+dayOfWeek); idx>=0; idx--) {
        let timeZone = new Date().getTimezoneOffset()
        let timeOffset = Number(timeZone*60*1000)
        let offset = 24*60*60*1000
        let dayObject = {
            commits : [],
            repos : [],
            date : null,
            total : null,
            add : null,
            sub : null
        }

        commits.forEach(commit => {
            commit.ctime = new Date(commit.ctime)

            if ((commit.ctime.getTime() < today.getTime() - (idx*offset) + timeOffset ) && 
                (commit.ctime.getTime() > today.getTime() - (idx*offset) - offset + timeOffset
            )) {
                
                dayObject.commits.push(commit)
                if (!dayObject.repos.find(repo => {return repo === commit.repo} ) ) {
                    dayObject.repos.push(commit.repo)
                }
                dayObject.date = commit.ctime.getDate()
                dayObject.total += commit.total
                dayObject.add += commit.added
                dayObject.sub += commit.deleted

                lastCommit = commit
            }
        })
        commitsArray.push(dayObject)
    }


    return {
        "commits" : commitsArray,
        "lastCommit" : lastCommit ? timeSince(lastCommit.ctime) : null,
        "commitCreated" : lastCommit ? lastCommit.ctime : null
    }
}

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