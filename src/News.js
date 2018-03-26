

import React, { Component } from 'react';
// import ReactDOM from 'react';
import ReactTestUtils from 'react-dom/test-utils';

class News extends Component{
    constructor(props){

      super(props)

      this.state={
      	news:this.props.news, status:this.props.status, providers:[] ,i18n:this.props.i18n     }
      this.getNews=this.getNews.bind(this)
      this.getProviders=this.getProviders.bind(this)
       this.updateSelectedProviders=this.updateSelectedProviders.bind(this)
      // getNews();

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
  componentDidMount(){ 
    this.getProviders()
  }


	   
	  
    toggleCheckBoxes(e,para){
    	
    	
    	Object.keys(this.refs).map((cb,i)=>{

    		ReactTestUtils.Simulate.change(this.refs[cb],{"checked": para});


    	})
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
            	app.props.toggleStatus()

              app.props.logger.addApiCall('News',"Success","fetch providers")
              app.props.logger.addSuccess()


                }) ;
              }).catch(function(err){
               if(app.props.logger!== undefined){

                app.props.logger.addFailure()
                app.props.logger.addApiCall('News',err,"fetch providers")
              }
              })

    }
    getNews(feeds){
      console.log('feeds',feeds)
      if(feeds =="all" || feeds[0]!==""){
    	  let url=""
    	  feeds=="all"? url="https://min-api.cryptocompare.com/data/news/?lang=EN" : url=`https://min-api.cryptocompare.com/data/news/?feeds=${feeds.join(',')}`
        let app=this;
        
        fetch(url) 
        .then(  
            function(mixture) {mixture.json().then(function(news){
                app.setState({news})

            	  app.props.toggleStatus()
            	 app.props.updateNews(news)
                app.props.logger.addApiCall('News',"Success","fetch news")
               app.props.logger.addSuccess()


                }) ;
              }).catch(function(err){
                 if(app.props.logger!== undefined){

                app.props.logger.addFailure()
                app.props.logger.addApiCall('News',err,"fetch news")
              }
              })
            }else{
              this.setState({news:[]})

              this.props.toggleStatus()
              this.props.updateNews([])
            }
    }
    updateSelectedProviders(e){
     e.preventDefault()
     e.stopPropagation()
     let checkbox=e.target;
     let index =checkbox.dataset.index;
     let providers=this.state.providers
     providers[index].isChecked= ! providers[index].isChecked
     this.setState({providers})
     this.props.toggleStatus()
    }
    render(){
        let app=this;
        let {i18n}=this.state 
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
                     
                     <div className="col-md-5" ><img className="img-responsive square"  src={item.imageurl} /> </div>
                     <div className="col-md-4">
                       <a className="no-decoration" href={item.url}><h6>{item.title}</h6></a> 
                       <p className="shortened">{item.body.substring(0, 70)+'...'}<a className="no-decoration" href={item.url}>{i18n.t('tabs.tab1.readmore')}</a></p>
                       <span className="blue"><label className="dark">Source:</label> {item.source}</span>
                     </div>
                   </div>
                </div>
        		)
        });
    	return(
    	<div className="container-fluid"> 
    	  <div className="col-md-12 ">
    	  <div className="row">
    	  <button onClick={(e)=>this.toggleCheckBoxes(e,true)} >{i18n.t('tabs.tab1.toggleCheck')}</button>
    	   
    	    <ul className="providers" style={{columnCount: Math.round(providers.length/5)}}>{providers} </ul>
    	  </div>
    	  <div className="row"> {news} </div>

          </div>
    	</div>
    	)
    }
   


}

export default News;