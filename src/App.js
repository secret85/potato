
import React, { Component } from 'react';
// import En from './i18n/locales/en.json'
// import Ar from './i18n/locales/ar.json'
import i18n_ from './i18n/i18n_';


import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

//// third-party laibraries///
// import 'bootstrap/dist/css/bootstrap.min.css';
 // import $ from 'jquery';
 // window.jQuery = window.$ = $;
// require('popper')
// require('bootstrap');
// require('bootstrap-datepicker');
////////////////////////////////

import logo from './potato.gif';
import './App.css';
import './tabs.css'
import './layout.css'
// const News = require('./News');
import News from './News';
import Prices from './Prices';
import Exchanges from './Exchanges';
import Chart from './Charts';
import Logger from './Logger';
class App extends Component {

  constructor(props){
    super(props)

     this.i18n= new i18n_();
     // this.startDate=Date.now()

    this.state={
       i18n:this.i18n,
       shouldUpdateNews:false, shouldUpdatePrices: false,shouldUpdateExchanges:false, news:[],exchanges:[],
       loggerIsShown:"none"
    }


    this.ToggleShouldUpdateNews=this.ToggleShouldUpdateNews.bind(this)
    this.updateNews=this.updateNews.bind(this)

    this.updateExchanges=this.updateExchanges.bind(this)

    this.ToggleShouldUpdatePrices=this.ToggleShouldUpdatePrices.bind(this)
    this.ToggleShouldUpdateExchanges=this.ToggleShouldUpdateExchanges.bind(this)

    this.toggleLogger=this.toggleLogger.bind(this)
    this.setLocale=this.setLocale.bind(this)



  }





  toggleLogger(e){
    
    let value = this.state.loggerIsShown=="none" ? "block" : "none"
    this.setState({loggerIsShown:value})
  }

  setLocale(e){
    let language=(e.target).options[ e.target.selectedIndex ].dataset.lang
     let i18n=this.i18n
     i18n.setLocale(language);
     this.setState({i18n:i18n})
  }

  ToggleShouldUpdateNews(){
    this.setState({
      shouldUpdateNews: !this.state.shouldUpdateNews
    })
  }
  updateNews(news){
    this.setState({
      news
    })
  }
  updateExchanges(exchanges){
    this.setState({
      exchanges
    })
  }
  ToggleShouldUpdatePrices(){
    this.setState({
      shouldUpdatePrices: !this.state.shouldUpdatePrices
    })
  }
    ToggleShouldUpdateExchanges(){

    this.setState({
      shouldUpdateExchanges: !this.state.shouldUpdateExchanges
    })
  }


  componentWillUpdate(nextProps, nextState) {

      if(nextState.i18n!== this.state.i18n){
          this.setState({i18n:nextState.i18n})
        }
      if(nextState.loggerIsShown!== this.state.loggerIsShown){
          this.setState({loggerIsShown:nextState.loggerIsShown})
        }
             
     
    }


  render() {
  
    let {i18n}= this.state
    return (
      <div className="App">

        <div className="container-fluid bg-dark" style={{minHeight:'10em',maxHeight:'10em',position:'fixed',zIndex:'99999'}} >
         <div className="row" >
            <div className="col-md-2">
             <img src={logo} className="App-logo" alt="logo" />
             <h1 className="App-title white">{i18n.t('welcome')}</h1>
           </div>
           <div className="col-md-2">
                  <span className="white">{i18n.t('language')}</span>
                  <select onChange={this.setLocale} >
                     <option data-lang="en" selected>{i18n.t('languages.en')}</option>
                     <option data-lang="ar" >{i18n.t('languages.ar')}</option>
                  </select>
                  <button className="blue xsmall" onClick={this.toggleLogger}>{i18n.t('showLogger')}</button>


           </div>

           <div className="col-md-8 " >
            <div style={{display:this.state.loggerIsShown}}>
              <Logger i18n={this.state.i18n} ref={"logger"}  />
            </div>
           </div>
          </div>
        </div>
        

          <Tabs 
            
            className="tabs tabs-1"  
            renderActiveTabContentOnly={true}


          >

            <div className="tab-links">
                <TabLink onClick={this.ToggleShouldUpdateNews}  to="tab1">{i18n.t('tabs.titles.tab1')}</TabLink>
                <TabLink to="tab2">{i18n.t('tabs.titles.tab2')}</TabLink>
                <TabLink onClick={this.ToggleShouldUpdateExchanges}  to="tab3">{i18n.t('tabs.titles.tab3')}</TabLink>
                <TabLink onClick={this.ToggleShouldUpdateExchanges}  to="tab4">{i18n.t('tabs.titles.tab4')}</TabLink>

            </div>


            <div className="content" style={{height:'auto',width:'100%'}}>
                <TabContent for="tab1"  >
                  <Chart i18n={this.state.i18n} />
                </TabContent>
                <TabContent for="tab2">
                    <Prices     
                      i18n={this.state.i18n}
                      logger={this.refs.logger}                  
                      status={this.state.shouldUpdatePrices} 
                      toggleStatus={this.ToggleShouldUpdatePrices}
                    />
                </TabContent>
                <TabContent for="tab3">
                    <Exchanges
                      i18n={this.state.i18n}  
                      logger={this.refs.logger}
                      status={this.state.shouldUpdateExchanges} 
                      toggleStatus={this.ToggleShouldUpdateExchanges}
                      exchanges={this.state.exchanges} updateExchanges={this.updateExchanges}

                    />
                </TabContent>
                  <TabContent for="tab4">
                    
                    <News 
                     i18n={this.state.i18n}
                     logger={this.refs.logger}
                     news={this.state.news} updateNews={this.updateNews} status={this.state.shouldUpdateNews}
                     toggleStatus={this.ToggleShouldUpdateNews} />
                </TabContent>
            </div>
          </Tabs>
        
      </div>
    );
  }
}

export default App;
