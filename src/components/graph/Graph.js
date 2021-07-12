import React, {useEffect} from 'react'
import './Graph.css';
import { Doughnut } from 'react-chartjs-2';
import { getCasesForGraph } from '../../actions/dateRangeAction';
import { useStateValue } from '../../context/StateProvider';

//   Date.prototype.addDays = function(days){
//     var dat = new Date(this.valueOf())
//     dat.setDate(dat.getDate() - days);
//     return dat;
// }

// function getDates(startDate, endDate) {
//    var dateArray = new Array();
//    var currentDate = startDate;
//    while (currentDate > endDate) {
//      dateArray.push(currentDate)
//      currentDate = currentDate.addDays(1);
//    }
//    return dateArray;
//  }


function Graph(props) {
    // let dateArray = getDates(new Date(), (new Date()).addDays(props.daysCount));
    
    // data.labels = dateArray
    const [state, dispatch] = useStateValue();

    let data = {
        labels: Object.keys(state.graphData),
        datasets: [
          {
            label: 'Dataset 1',
            data: mapData(),
            backgroundColor: [
                'red', 'blue', 'green', 'orange'
            ]
            
          }
        ]
      };

      const options = {
        aspectRatio: 1,
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              }
            }
       
      }

      function mapData(){
        let arr= [];
        const all_keys = Object.keys(state.graphData)
        all_keys.forEach(item=>{
            arr.push(state.graphData[item])
        })
        
        return arr
      }
        

    
    useEffect(()=>{
        getCasesForGraph(dispatch, props.toDate)
        
    }, [props.toDate])
  
    return (
        <>
            <div className='header'>
            <div className='graph__title'>Report Summary</div>
            </div>
            <Doughnut data={data}  options={options}/>
        </>
    )
}

export default Graph
