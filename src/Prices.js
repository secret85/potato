

import React, { Component } from 'react';
// import ReactDOM from 'react';
import ReactTestUtils from 'react-dom/test-utils';

class Prices extends Component{
    constructor(props){

      super(props)

      this.state={
      	news:this.props.news, status:this.props.status, providers:[]      }
      this.getNews=this.getNews.bind(this)
      this.getProviders=this.getProviders.bind(this)
       this.updateSelectedProviders=this.updateSelectedProviders.bind(this)
      // getNews();
      this.getProviders()

     }



	componentWillReceiveProps(nextProps) {

            
	   	if(nextProps.status !== this.state.status){
	      	this.setState({status:nextProps.status})
             
	      	nextProps.status==true? this.getNews(this.state.providers.map((p,i)=>p.isChecked? p.key: '')) : null
	      }
	    if(nextProps.news !== this.state.news){
	    	console.log(nextProps.news[0])
	    	console.log(nextProps.status)

	      	this.setState({news:nextProps.news})
            // alert(nextProps.status)
	      	// nextProps.status==true? this.getNews(this.state.providers.map((p,i)=>p.key)) : null
	      }


	   
	  }
    toggleCheckBoxes(e,para){
    	alert(para)
    	console.log(this.refs)
    	Object.keys(this.refs).map((cb,i)=>{

    		// let state= p.isChecked 
    		// let provider= p.isChecked = ! p.isChecked
    		ReactTestUtils.Simulate.change(this.refs[cb],{"target": {"checked": true}});

    	})
    	// this.setState({providers})
    }
    getProviders(){
    	        let app=this;
        fetch('https://min-api.cryptocompare.com/data/news/providers') 
        .then(  
            function(mixture) {mixture.json().then(function(data){
            	let providers=data.map(function(provider,index){
            		return(
                        {key:provider.key,img:provider.image,isChecked:true}
            			)
            	})
                app.setState({providers})
                // app.getNews("all");
            	 app.props.toggleStatus()


                }) ;
              }).catch(function(err){console.log(err)})

    }
    getNews(feeds){
    	let url="https://min-api.cryptocompare.com/data/news/?lang=EN"
    	feeds=="all"? null : url=`https://min-api.cryptocompare.com/data/news/?feeds=${feeds.join(',')}`
        let app=this;
        console.log(url)
        fetch(url) 
        .then(  
            function(mixture) {mixture.json().then(function(news){
                app.setState({news})
            	 console.log(news[news.length-1]);

            	  app.props.toggleStatus()
            	 app.props.updateNews(news)
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
    }
    updateSelectedProviders(e){
     e.preventDefault()
     e.stopPropagation()
     let checkbox=e.target;
     let index =checkbox.dataset.index;
     let providers=this.state.providers
     // console.log(providers);
     providers[index].isChecked= ! providers[index].isChecked
     this.setState({providers})
     this.props.toggleStatus()
      // this.getNews(providers.map((p,i)=>{return p.key}));
    }
    render(){
        let app=this; 
        const providers= this.state.providers.map(function(provider,index){
    	  let key=Math.random()
    	  let isChecked= provider.isChecked ? "checked" : null
    	  
           return(
            
            
            <li key={key}>
               <input ref={`cb-${index+1}`} type="checkbox" className="provider" data-index={index} checked={isChecked} onChange={app.updateSelectedProviders} />
               {provider.key}
            </li>
            


           	)
    })

        let news=this.state.news.map(function(item,index){
            let key=Math.random()
        	return (
               
                <div key={key} id={item.id} className="item-container">
                   <div className="row">
                     
                     <div className="col-md-5" ><img className="img-responsive square"  scr={item.imageurl} /> </div>
                     <div className="col-md-4">
                       <a className="no-decoration" href={item.url}><h6>{item.title}</h6></a> 
                       <p className="shortened">{item.body}</p>
                       <span className="blue">{item.source}</span>
                     </div>
                   </div>
                </div>
        		)
        });
    	return(
    	<div className="container-fluid"> 
    	  <div className="col-md-12 ">
    	  <div className="row">
    	  <button onClick={(e)=>this.toggleCheckBoxes(e,true)} >Check All</button>
    	  <button onClick={(e)=>this.toggleCheckBoxes(e,false)} >Uncheck All</button>
    	   
    	    <ul className="providers" style={{columnCount: Math.round(providers.length/5)}}>{providers} </ul>
    	  </div>
    	  <div className="row"> {news} </div>

          </div>
    	</div>
    	)
    }
   


}

export default Prices;