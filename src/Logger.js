import React,{Component} from 'react'
class Logger extends Component{

    constructor(props){

      super(props)

      this.state={
        // data:[],options:[] status:this.props.status
        elapsed:this.props.elapsed,success:10,failures:0,i18n:this.props.i18n,
        apiCalls:[{src:"App",status:"preparing",description:"..."}],ipLimits:{CallsLeft:{}},
        Currencies:{}

      }
      this.addFailure=this.addFailure.bind(this)
      this.addSuccess=this.addSuccess.bind(this)
      this.updateIpLimits=this.updateIpLimits.bind(this)
      // this.startSession=startSession.bind(this)
      this.updateIpLimits()
      setInterval(this.updateIpLimits,60000)
	                            	

    }

    componentWillReceiveProps(nextProps){
      nextProps.elapsed!== this.state.elapsed ? this.setState({elapsed:nextProps.elapsed}):null
    }


    
    addSuccess(){
    	this.setState({success:this.state.success+1})
    }

    addFailure(){
    	    	this.setState({failures:this.state.failures+1})

    }
    addApiCall(src,status,description){

      let apiCalls=this.state.apiCalls
      apiCalls.length > 4 ? apiCalls.shift() : null
      apiCalls.push({src:src,status:status,description:description})
      this.setState({apiCalls})
      
    }
    updateIpLimits(){
    	let app= this
    	fetch("https://min-api.cryptocompare.com/stats/rate/limit")
    	  .then(  
            function(mixture) {mixture.json().then(function(data){
                let ipLimits=data.Hour
                app.setState({ipLimits})

               app.addApiCall('IpLimits',"Success","fetch data")
               app.addSuccess()


                }) ;
              }).catch(function(err){
              	
                  app.addFailure()
                  app.addApiCall('IpLimits',err,"fetch data")
              })
    }





    render(){

    	            let {i18n}=this.state
                           
			        let elapsed = Math.round(this.state.elapsed / 100);

			        let seconds = (elapsed / 10).toFixed(1); 
			        
			        let data=Object.keys(this.state.ipLimits.CallsLeft).map((k,i)=>{
                          return(
                          <li key={i+Math.random()} >
                          {`${k}: ${this.state.ipLimits.CallsLeft[k]}`}
                          </li>
                          )

			        })

   
            
			        let apiCalls=this.state.apiCalls.map((call,index)=>{
                        let key=Math.random()
                        let readingClass= index==0 ? 'reading' : ''
			        	return(

                           <li key={key} className={call.status=="Success" ? `${readingClass} apicalls green` : `${readingClass} apicalls red` }>
                              {`${call.src} > ${call.status} > ${call.description} `} 
                           </li>

			        		)
			        });

                    

      	return(
            <div className="co-md-12 logger bg-dark" >
    
	            <div className="col-md-12">
	                <div className="row">
	                    <div className="col-md-2">
	                       <span className="white">Session:</span>
	                       <span className="green">{seconds}{i18n.t("sec")}</span>
	                    </div>
	                    <div className="col-md-2">
	                    Calls Left:
		                    <ul className="twoCol"

		                    >
		                    {data}
		                    <li className="green">Success:{this.state.success}</li>
	                        <li className="red">failures:{this.state.failures}</li>
		                       
		                    </ul>
	                    </div>

	                    <div className="col-md-4" style={{overflow:'auto',height:'10em'}}>
	                        <ul className="ul-flat " style={{fontSize:'12px'}}> {apiCalls} </ul>
	                    </div>
	                </div>

	            </div>


            </div>
      		)
      }
    

}

export default Logger