import React, { Component } from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import logo from './potato.gif';
import './App.css';
import './tabs.css'

// const News = require('./News');
import News from './News';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Potato</h1>
        </header>
        

          <Tabs className="tabs tabs-1">
            <div className="tab-links">
                <TabLink  to="tab1">News</TabLink>
                <TabLink to="tab2">Prices</TabLink>
                <TabLink to="tab3">Historical Information</TabLink>
            </div>

            <div className="content" style={{height:''}}>
                <TabContent for="tab1">
                    <News  />
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
