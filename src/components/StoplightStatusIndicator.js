import React from 'react';

export default ({stoplightStatus}) => (
    <React.Fragment>
        {(() => {
            switch (stoplightStatus) {
                case 'green': return (
                    <span className="badge badge-pill badge-success"><i className="material-icons pt-1 stoplight-badge">done</i></span>
                    )
                case 'yellow': return (
                    <span className="badge badge-pill badge-warning"><i className="material-icons pt-1 stoplight-badge">help_outline</i></span>
                    )
                case 'red': return (
                    <span className="badge badge-pill badge-danger"><i className="material-icons pt-1">warning</i></span>
                    )
                default: return (
                    <span className="badge badge-pill badge-secondary"><i className="material-icons pt-1">warning</i></span>
                    )
            }
        })()}
    </React.Fragment>
)