import React, { Component } from 'react';
import { connect } from "react-redux";

const Cohorts = ({ cohorts }) => (
    <div className="container">
        {cohorts && cohorts.length ? 
            (<div className="list-group">
                <div className="list-group-item.active.disabled">
                    <div className="row">
                        <div className="col-sm-7">Cohort</div>
                        <div className="col-sm-3">Start Date</div>
                        <div className="col-sm-1">Active</div>
                        <div className="col-sm-1">Students</div>
                    </div>
                </div>
                {cohorts.map(cohort => {return (
                        <a href="" className="list-group-item list-group-item-action">
                            <div className="row">
                                <div className="col-sm-7">{cohort.name}</div>
                                <div className="col-sm-3">{cohort.startDate}</div>
                                <div className="col-sm-1">{!cohort.graduated ? "✔" : "❌"}</div>
                                <div className="col-sm-1">{cohort.students.length}</div>
                            </div>
                        </a>
                    )}
                )}
            </div>)
            : 
            (<div></div>)
        }
    </div>
)

const mapStateToProps = state => ({ cohorts: state.cohorts })

export default connect(mapStateToProps)(Cohorts);