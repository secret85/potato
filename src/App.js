
import React, { Component } from 'react';
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

class App extends Component {

  constructor(){
    super()
    this.state={
       shouldUpdateNews:false, news:[]
    }
    this.ToggleShouldUpdateNews=this.ToggleShouldUpdateNews.bind(this)
    this.updateNews=this.updateNews.bind(this)
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Potato</h1>
        </header>
        

          <Tabs className="tabs tabs-1"
             



          >

            <div className="tab-links">
                <TabLink onClick={this.ToggleShouldUpdateNews}  to="tab1">News</TabLink>
                <TabLink to="tab2">Prices</TabLink>
                <TabLink to="tab3">Historical</TabLink>
            </div>

            <div className="content" style={{height:'auto',width:'100%'}}>
                <TabContent for="tab1"  >
                    <News news={this.state.news} updateNews={this.updateNews} status={this.state.shouldUpdateNews} toggleStatus={this.ToggleShouldUpdateNews} />
                </TabContent>
                <TabContent for="tab2">
                    <h2>Tab2 content</h2>
                    <div>¯\_(ツ)_/¯</div>
                </TabContent>
                <TabContent for="tab3">
                    <h2>Tab3 content</h2>
                    <div>(╯°□°）╯︵ ┻━┻)</div>
                </TabContent>
            </div>
          </Tabs>
        
      </div>
    );
  }
}

export default App;
