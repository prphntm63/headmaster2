import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {ListGroup, Button} from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const Cohorts = ({ cohorts, user }) => (
    <React.Fragment>
        <div>
            {!user.id ? (
                <Link to={'./auth/github'}>
                    <Button  variant="primary">
                        Login With Github
                    </Button >
                </Link>
            ) 
            : 
            (<div></div>)
            }   
        </div>
        
        
        <div className="container">
            {cohorts && cohorts.length ? 
                (<ListGroup>
                    <ListGroup.Item as="li" active disabled key="header">
                        <div className="row" >
                            <div className="col-sm-7">Cohort</div>
                            <div className="col-sm-3">Start Date</div>
                            <div className="col-sm-1">Active</div>
                            <div className="col-sm-1">Students</div>
                        </div>
                    </ListGroup.Item>
                    {cohorts.map(cohort => {return (
                        <LinkContainer to={'/'+cohort.slug} key={cohort.slug}>
                            <ListGroup.Item action >
                                <div className="row" >
                                    <div className="col-sm-7">{cohort.name}</div>
                                    <div className="col-sm-3">{cohort.startDate}</div>
                                    <div className="col-sm-1">{!cohort.graduated ? "✔" : "❌"}</div>
                                    <div className="col-sm-1">{cohort.students.length}</div>
                                </div>
                            </ListGroup.Item>
                        </LinkContainer>
                        )}
                    )}
                </ListGroup>)
                : 
                (<div></div>)
            }
        </div>
    </React.Fragment>
)

const mapStateToProps = state => ({ 
    cohorts: state.cohorts,
    user : state.user 
})

export default connect(mapStateToProps)(Cohorts);