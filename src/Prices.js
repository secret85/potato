

import React, { Component } from 'react';
// import ReactDOM from 'react';
import ReactTestUtils from 'react-dom/test-utils';

class Prices extends Component{
    constructor(props){

      super(props)

      this.state={
      	prices:{BTC:{},ETH:{}}, status:this.props.status, 
      	providers:[{0:"USD",isChecked:true},{1:"EUR",isChecked:true},{2:"GBP",isChecked:true},{3:"JPY",isChecked:true},{4:"CNY",isChecked:true}]      }
      this.getPrices=this.getPrices.bind(this)
       this.startLiveTracking=this.startLiveTracking.bind(this)
       this.updateSelectedProviders=this.updateSelectedProviders.bind(this)
       this.loadData=this.loadData.bind(this)
      this.getPrices(Object.keys( this.state.providers).map((k,i)=> k==i && this.state.providers[k].isChecked ? this.state.providers[k][k] : '') )
      this.startLiveTracking()

     }

    startLiveTracking(){

       let launcher=()=>{
            this.setState({fading: true});

            this.getPrices(Object.keys( this.state.providers).map((k,i)=> k==i && this.state.providers[k].isChecked ? this.state.providers[k][k] : '') )
        }
	                    setInterval(launcher,15000)
    }

	componentWillReceiveProps(nextProps) {

            
	   	if(nextProps.status !== this.state.status){
	      	this.setState({status:nextProps.status})
            let currencies=this.getPrices(Object.keys( this.state.providers).map((k,i)=> k==i && this.state.providers[k].isChecked ? this.state.providers[k][k] : '')  )
            console.log(this.state.prices)
	      	nextProps.status==true? currencies : null
	      }
	    // if(nextProps.news !== this.state.news){
	    // 	console.log(nextProps.news[0])
	    // 	console.log(nextProps.status)

	    //   	this.setState({news:nextProps.news})

	    //   }


	   
	  }
 
    getPrices(currencies){ //https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR,GBP, JPY,CNY
    	if(currencies.map((k,i)=>k!==''? 1 : 0).reduce((a, b) => a + b, 0)>0){
	    	// let url="https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR,GBP,JPY,CNY"
	    	let url=`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=${currencies.join(',')}`
	        let app=this;
	        console.log(url)
	        fetch(url) 
	        .then(  
	            function(mixture) {mixture.json().then(function(prices){
	                app.setState({prices})
	                app.setState({fading: false});
	                
	            	 // console.log(news[news.length-1]);
	            	  // app.props.toggleStatus()
	            	 // app.props.updateprices(prices)

	                    // var salt=data.salt;
	                    // salt["body"]=JSON.stringify({"body":"(#@#^&,)" })
	                    
	                    // var i=0;
	                    // var p=(id)=>{
	                    //   if(i ==data.msg.length) 
	                    //     clearInterval(id)
	                    //   else
	                    //     console.log(window.atob(data.msg[i]));
	                    //     i++;
	                    // }
	                    // setInterval(p,3000)

	                }) ;
	              }).catch(function(err){console.log(err)})
	       }else{
	       	//this.logger.put('no results!')
	       }
    }
    updateSelectedProviders(e){
     e.preventDefault()
     e.stopPropagation()
     let checkbox=e.target;
     let index =checkbox.dataset.index;
     let providers=this.state.providers
      
     providers[index].isChecked= ! providers[index].isChecked
     console.log(providers);
     this.setState({providers})
     this.props.toggleStatus()
      // this.getPrices(providers.map((p,i)=>{return p.key}));
    }
    
    loadData(EC){
    	               let prices= Object.keys(this.state.prices[EC]).map((currency,index)=>{
                         let key=Math.random()
                        return(
                        <li key={key}>
                           
                           
                           <span className='faded' >
                           {EC=='BTC' ? this.state.prices.BTC[currency] : this.state.prices.ETH[currency] }

                           <span className="blue small">{currency}</span></span>
                        </li>
                        )
	                })
	              
            return prices


    		
    }
    render(){
        let app=this; 



    	return(
    	<div className="container-fluid"> 
	    	<div className="col-md-12 ">
	    	    <div className="row">
	    	     <ul className="providers" style={{columnCount: Math.round(this.state.providers.length/2)}}>
	              {  this.state.providers.map((provider,index)=>{
                        let key=Math.random()
    	                let isChecked= provider.isChecked ? "checked" : null
    	                if (this.state.providers.length >0){
		                        return(
		                        <li key={key}>
		                           <input ref={`cb-${index+1}`} type="checkbox" 
		                           className="provider" data-index={index} checked={isChecked} 
		                           onChange={app.updateSelectedProviders} />
		                           
		                           <span >{provider[index]}</span>
		                        </li>
		                        )
                        }else{return(<p>no providers selected</p>)}
	                })
	              }
	              </ul>
	    	   
	    	       
	    	    </div>
	    	    <div className='row'>
		    	    <div className="col-md-6 ">
		                  <ul className="prices">
			                  BTC live Prices
			                  {this.loadData('BTC')}
		                  </ul>
	                </div>
	                <div className="col-md-6 ">
	            
		                <ul className="prices">
		                ETH live Prices 
			    	    {this.loadData('ETH')}
			    	   </ul>
    	            </div>
	    	    </div>
    	    </div>



    	</div>
    	)
    }
   


}

export default Prices;