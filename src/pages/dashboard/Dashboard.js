import React, {useState} from 'react';
import Card from '../../components/card/Card';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import './Dashboard.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Graph from '../../components/graph/Graph';
import moment from 'moment';
moment().format();

function Dashboard() {

    const history = useHistory();
    const [currentStatus, setStatus] = useState("Hospitalized");
    const [toDate, setToDate] = useState(new Date());
    // const [fromDate, setFromDate] = useState(new Date(moment().add(-1, 'days')));
    const [state, dispatch] = useStateValue();

    const logout = ()=>{
        localStorage.clear();
        history.push('/login')
    }

    return (
        <div>
            <h3 className="dsb_txt_cntr">Covid Tracker</h3>
            <div className="dsb_dsbuserInfo">
                <span onClick={logout}>{localStorage.email}</span>
            </div>
            <div className = "dsb__mainCOntent dsb__disFlex">
                <div className="dsb_filterSec dsb__disFlex">
                    <div className="dsb_field">
                        <span className="dsb_filterLabel">Status</span>
                        <select className="dbs__select" id="currentStatus" onChange= {event=> setStatus(event.target.value)}>
                            <option name="Hospitalized" value="Hospitalized">Hospitalized</option>
                            <option name="Recovered" value="Recovered">Recovered</option>
                            <option name="Deceased" value="Deceased">Deceased</option>
                        </select>
                    </div>

                    {/* <div className="dsb_field">
                        <span className="dsb_filterLabel">From Date</span>
                        <DatePicker className="dbs__select" selected={fromDate} onChange={(date) => setFromDate(date)} />
                    </div> */}

                    <div className="dsb_field">
                        <span className="dsb_filterLabel">To Date</span>
                        <DatePicker className="dbs__select" selected={toDate} onChange={(date) => setToDate(date)} />
                        {/* <input className="dbs__select" type="date" value={toDate} onChange={(event)=> setToDate(event.target.value)}/> */}
                    </div>

                </div>
                <div className="dsb__cardSec">
                    <Card 
                        key ='present'
                        currentStatus = { currentStatus }
                        toDate = { toDate }
                        name = { 'Month to date active cases'}
                        type="present"
                    />

                    <Card 
                        key ='past'
                        currentStatus = { currentStatus }
                        toDate = { toDate }
                        name = { 'Last month active cases'}
                        type="past"
                    />

                    <Card 
                        key ='future'
                        currentStatus = { currentStatus }
                        toDate = { toDate }
                        name = { 'Estimated month end cases'}
                        type="future"
                    />  

                </div>
                <div className="dsb__graphSec">
                    <Graph 
                        toDate={toDate}
                    />
                </div>

            </div>
            
            
            
        </div>
    )
}

export default Dashboard
