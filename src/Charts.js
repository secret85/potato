import React,{Component} from 'react'
const LineChart = require("react-chartjs").Line;
class Charts extends Component{

    constructor(props){

      super(props)
      this.generatePairs=this.generatePairs.bind(this)
      this.state={
      	i18n:this.props.i18n,
        data:[0,1,2,3,4],
        pairs:this.generatePairs(['BTC','ETH','USD','EUR','GBP','JPY']),
        status:this.props.status,
        selectedPair:[],
        exchangers:{key:{
        	key:[]
        }}

      }
      this.getChartInfo=this.getChartInfo.bind(this)
      this.calculateAvg=this.calculateAvg.bind(this)
      // this.getExchangersList=this.getExchangersList.bind(this)
      this.handleOnChange=this.handleOnChange.bind(this)

    }

    handleOnChange(e){
        let pair=(e.target).options[ e.target.selectedIndex ].dataset.pair.split("-")
        this.setState({selectedPair:[pair[0],pair[1]]})

        this.getChartInfo(pair[0],pair[1],"1","histohour",0)
        this.getChartInfo(pair[0],pair[1],"1","histoday",1)
    	this.getChartInfo(pair[0],pair[1],"7","histoday",2)
    	this.getChartInfo(pair[0],pair[1],"30","histoday",3)
    	this.getChartInfo(pair[0],pair[1],"365","histoday",4)

    }

    calculateAvg(arr){
     return arr.reduce((a, b) => a + b, 0)/arr.length;
    }
    componentWillUpdate(nextProps, nextState) {

      if(nextState.selectedPair!== this.state.selectedPair){
      	
          this.setState({selectedPair:nextState.selectedPair})
        }

          
     
    } 
// getExchangersList(){
//     	 let app=this;
//         fetch('https://min-api.cryptocompare.com/data/all/exchanges') 
//         .then(  
//             function(mixture) {mixture.json().then(function(exchangers){

//                 app.setState({exchangers})
//                console.log('exchangers',exchangers)

//                // app.props.logger.addApiCall('News',"Success","fetch providers")
//                // app.props.logger.addSuccess()


//                 }) ;
//               }).catch(function(err){
//               	if(app.props.logger!== undefined)
//                   app.props.logger.addFailure()
//                   app.props.logger.addApiCall('News',err,"fetch providers")
//               })

//     }

       generatePairs(arr){

		let results = [];

		for (let i = 0; i < arr.length - 1; i++) {
		  for (let j = i + 1; j < arr.length; j++) {
		    arr[i] !== arr[j] ? results.push([arr[i],arr[j]]) : null;
		  }
		}
		return results
    }
    getChartInfo(currency1,currency2,period,src,index){
            // src=="histohour" ? this.setState({data:[]} : "" ;//reset 
	    	let url=`https://min-api.cryptocompare.com/data/${src}?aggregate=${period}&fsym=${currency1}&tsym=${currency2}&limit=10`
	        let app=this;
	        console.log(url)
	        fetch(url) 
	        .then(  
	            function(mixture) {mixture.json().then(function(response){
                    let avg = app.calculateAvg(response.Data.map((k,i)=> k.close))
	                //app.props.updateExchanges(exchanges)
	                let data=app.state.data 
	                data[index]=avg
	                
                       
                    app.setState({data})
	                               


	                }) ;
	              }).catch(function(err){console.log(err)})


      }

      ComponentWillReceiveProps(nextProps){


      }
      ComponentDidMount(){
      }
      render(){
        let {selectedPair,i18n}=this.state
        
      	let dataset= {
	         labels: ["One Hour", "One Day", "One Week", "One Month", "One year"],
	         datasets: [

					{
						label: selectedPair.join("-->"),
						fillColor: "rgba(151,187,205,0.2)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: this.state.data
					}
	            ]
            }

            let pairs=this.state.pairs.map((pair,index)=>{
                            let key =Math.random()+989898
                            
                            return( 
                          	 	<option key ={ key}
                          	 	    data-pair={pair[0]+"-"+pair[1]} >
                          	 	    {pair[0]+'-->'+pair[1]}
                          	 	 </option>
                          	 	 )
                                
            })

    

      	return(
      		 <div className="container">
               <div className="row">
                  <span className="white"></span>
                  <select onChange={this.handleOnChange} >
                  <option>{i18n.t('tabs.tab4.select')}</option>
                    {pairs}
                  </select>

                </div>
                <div className="row blue">
                {selectedPair.join("-->")}
                </div>
                <div className="row">
      		    <LineChart data={dataset}  width='600' height='250'/>
      		    </div>
             </div>
      		)
      }
    }



export default Charts