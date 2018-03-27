

import React, { Component } from 'react';
// import ReactDOM from 'react';
import ReactTestUtils from 'react-dom/test-utils';

class Prices extends Component{
    constructor(props){

      super(props)
      this.timer=null;
      this.state={
      	prices:{BTC:{},ETH:{}}, status:this.props.status,i18n:this.props.i18n, 
      	Currencies:[{0:"USD",isChecked:true},{1:"EUR",isChecked:true},{2:"GBP",isChecked:true},{3:"JPY",isChecked:true},{4:"CNY",isChecked:true}]      }
      this.getPrices=this.getPrices.bind(this)
       this.startLiveTracking=this.startLiveTracking.bind(this)
       this.updateSelectedCurrencies=this.updateSelectedCurrencies.bind(this)
       this.loadData=this.loadData.bind(this)
      this.getPrices(Object.keys( this.state.Currencies).map((k,i)=> k==i && this.state.Currencies[k].isChecked ? this.state.Currencies[k][k] : '') )
      

     }

    startLiveTracking(){

       let launcher=()=>{
            this.setState({fading: true});

            this.getPrices(Object.keys( this.state.Currencies).map((k,i)=> k==i && this.state.Currencies[k].isChecked ? this.state.Currencies[k][k] : '') )
        }
	                  this.timer=  setInterval(launcher,60000)
    }

	componentWillReceiveProps(nextProps) {

            
	   	if(nextProps.status !== this.state.status){
	      	this.setState({status:nextProps.status})
            let currencies=this.getPrices(Object.keys( this.state.Currencies).map((k,i)=> k==i && this.state.Currencies[k].isChecked ? this.state.Currencies[k][k] : '')  )
	      	nextProps.status==true? currencies : null
	      }
	   
	  }
	componentDidMount(){

        this.startLiveTracking()
    }

    componentWillUnmount(){


        clearInterval(this.timer);
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

	             if(app.props.logger!== undefined){
                app.props.logger.addApiCall('Prices',"Success","fetch prices")
               app.props.logger.addSuccess()
             }


                }) ;
              }).catch(function(err){
                  if(app.props.logger!== undefined){
                app.props.logger.addFailure()
                app.props.logger.addApiCall('Prices',err,"fetch prices")
              }
              })
	       }else{
	       	//this.logger.put('no results!')
	       }
    }
    updateSelectedCurrencies(e){
     e.preventDefault()
     e.stopPropagation()
     let checkbox=e.target;
     let index =checkbox.dataset.index;
     let Currencies=this.state.Currencies
      
     Currencies[index].isChecked= ! Currencies[index].isChecked
     console.log(Currencies);
     this.setState({Currencies})
     this.props.toggleStatus()
      // this.getPrices(Currencies.map((p,i)=>{return p.key}));
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
        let {i18n}=this.state



    	return(
    	<div className="container-fluid"> 
	    	<div className="col-md-12 ">
	    	    <div className="row">
	    	     <ul className="providers" style={{columnCount: Math.round(this.state.Currencies.length/2)}}>
	              {  this.state.Currencies.map((currency,index)=>{
                        let key=Math.random()
    	                let isChecked= currency.isChecked ? "checked" : null
    	                if (this.state.Currencies.length >0){
		                        return(
		                        <li key={key}>
		                           <input ref={`cb-${index+1}`} type="checkbox" 
		                           className="currency" data-index={index} checked={isChecked} 
		                           onChange={app.updateSelectedCurrencies} />
		                           
		                           <span >{currency[index]}</span>
		                        </li>
		                        )
                        }else{return(<p>no Currencies selected</p>)}
	                })
	              }
	              </ul>
	    	   
	    	       
	    	    </div>
	    	    <div className='row'>
		    	    <div className="col-md-6 ">
		                  <ul className="prices">
			                  {i18n.t('tabs.tab2.btclp')}
			                  {this.loadData('BTC')}
		                  </ul>
	                </div>
	                <div className="col-md-6 ">
	            
		                <ul className="prices">
		                {i18n.t('tabs.tab2.ethlp')}
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