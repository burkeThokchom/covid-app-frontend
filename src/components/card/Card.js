import React, { useEffect, useState } from 'react';
import './Card.css';
import { useStateValue } from '../../context/StateProvider';
import { fetchCurrentMothActiveCases, fetchPastMothActiveCases, fetchEstimateMonthEndCases } from '../../actions/currentActiveCaseAction';

function Card(props) {
    const [state, dispatch] = useStateValue();
    const toDate = props.toDate;
    const currentStatus = props.currentStatus;
    //const fromDate= props.fromDate;
    
    useEffect(()=>{
        if(props.type==="present"){
            fetchCurrentMothActiveCases(dispatch, currentStatus, toDate)
        }
        else if(props.type==="past"){
            fetchPastMothActiveCases(dispatch, currentStatus, toDate)
        }
        else if(props.type==="future"){
            fetchEstimateMonthEndCases(dispatch, currentStatus, toDate)
        }
        
    }, [props.currentStatus, props.toDate])

    console.log('Props', props)

    return (
        <div className="crd__wrap" >
            <div className="crd__text">{props.name}</div>
            {
              props.type==="present" &&  <div className="crd__count">{state.currentActiveCount}</div>
            }
            {
              props.type==="past" &&  <div className="crd__count">{state.previousActiveCount}</div>
            }
            {
              props.type==="future" &&  <div className="crd__count">{state.estimateCount}</div>
            }
            
        </div>
    )
}

export default Card;
