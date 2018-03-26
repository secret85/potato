

import React, { Component } from 'react';
// import ReactDOM from 'react';
import ReactTestUtils from 'react-dom/test-utils';

class Exchanges extends Component{
    constructor(props){

      super(props)
      this.state={
      	currencies: this.generatePairs(['BTC','ETH','USD','EUR','GBP','JPY']),
      	exchanges:[], status:this.props.status, 
      }
       this.clean=this.clean.bind(this)

       this.state.currencies.map((k,i)=>this.getExchanges(k[0],k[1]) )


     }


	componentWillReceiveProps(nextProps) {

            
	   	if(nextProps.status !== this.state.status){
	      	this.setState({status:nextProps.status})

	      	this.state.currencies.map((k,i)=>this.getExchanges(k[0],k[1]) )

	      }

            
	   	if(nextProps.exchanges !== this.state.exchanges){

	      	 this.setState({exchanges:nextProps.exchanges})

	      }

	   
	  }
    generatePairs(array){

		let results = [];

		for (let i = 0; i < array.length - 1; i++) {
		  for (let j = i + 1; j < array.length; j++) {
		    results.push([array[i],array[j]]);
		  }
		}
		return results
    }
    getExchanges(currency1,currency2){ 
	    	let url=`https://min-api.cryptocompare.com/data/top/exchanges?fsym=${currency1}&tsym=${currency2}`
	        let app=this;
	        console.log(url)
	        fetch(url) 
	        .then(  
	            function(mixture) {mixture.json().then(function(Ex){
	            	let NewEx=Ex.Data
	                let oldEx=app.state.exchanges
	                NewEx.length >0 ? oldEx.push(NewEx) : null
	                app.setState({exchanges:oldEx})
	                app.props.updateExchanges(oldEx)
                    app.props.logger.addApiCall('Exchanges',"Success","fetch exchanges")
                    app.props.logger.addSuccess()


                }) ;
              }).catch(function(err){
                app.props.logger.addFailure()
                app.props.logger.addApiCall('Exchanges',err,"fetch exchanges")
              })

    }

 clean(array,deleteValue) {
 	let arr=array
  for (var i = 0; i < array.length; i++) {
    if (arr[i][0] == deleteValue) {         
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}
    render(){
        let app=this; 
        let exchanges=this.clean(this.state.exchanges,undefined).map((keys,index)=>{
        	let key= Math.random()
         return(
            
           <div  key={key}  >
	           <div className='row muted-muted' style={{margin:"0.2em auto"}}  >

	                {keys.map((exchange,i)=>{
	                	return(

                      	<div className="col-md-2 col-xs-3 xsmall blue-border" >
	                        <h4>{exchange.fromSymbol} => {exchange.toSymbol}</h4> 
                            <h5>{exchange.exchange}:</h5>
		                    <span  > 

			                    
			                    <span className="blue xsmall">{exchange.volume24h} <span className='bold red'>=></span><br/> </span>{exchange.volume24hTo}
		                    </span>
	                    </div>

                      )
	                })}
	              	
	              	
	              
	           </div>
           </div>
          
         )


        })

    	return(
    	<div className="container"> 
	     <div className="col-md-12">	
	        {exchanges}
    	    
         </div>


    	</div>
    	)
    }
   


}

export default Exchanges;