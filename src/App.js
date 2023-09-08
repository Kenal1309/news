import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import {
  BrowserRouter as
  Main,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 6;
  state= {
    progress:10,
  }

  setProgress= (progress) => {
  this.setState({progress:progress})
  }
  render() {
    return (
        
      <Main>
      <div> 
        <Navbar  />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
       <Route exact path="/"  element={< News setProgress={this.setProgress}  key="technology"  pageSize= {this.pageSize} category="technology" country="in"/>} > </Route>
       <Route exact path="/business"  element={< News setProgress={this.setProgress}  key="business" pageSize= {this.pageSize} category="business" country="in"/>} ></Route>
       <Route exact path="/technology"  element={< News setProgress={this.setProgress} key="technology"  pageSize= {this.pageSize} category="technology" country="in"/>} ></Route>
       <Route exact path="/general"  element={< News setProgress={this.setProgress}  key="general" pageSize= {this.pageSize} category="general" country="in"/>} ></Route>
       <Route exact path="/health"  element={< News setProgress={this.setProgress}  key="health" pageSize= {this.pageSize} category="health" country="in"/>} ></Route>
       <Route exact path="/science"  element={< News setProgress={this.setProgress} key="science"  pageSize= {this.pageSize} category="science" country="in"/>} > </Route>
       <Route exact path="/sports"  element={< News setProgress={this.setProgress}  key="sports" pageSize= {this.pageSize} category="sports" country="in"/>} > </Route>
       <Route exact path="/entertainment"  element={< News setProgress={this.setProgress}  key="entertainment" pageSize= {this.pageSize} category="entertainment" country="in"/>} > </Route>
      </Routes>
      </div>
      </Main>
          
    );
  }
}
