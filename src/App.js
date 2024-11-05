
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {
 constructor(props){
  super(props);
  this.state={
  mode:'light'
  }
 }
 togglebtn=()=>{
if(this.state.mode==='light'){
  this.setState=({
    mode:'dark'
  })
  console.log('dark')
}
else{
  this.setState=({
  mode:'light',
  })
  console.log('light')
}
   
  }
  
  render() {
    return (
      <div>
        <Router>
        <Navbar mode={this.state.mode} togglebtn={this.togglebtn}/>
        <Routes>
          <Route exact path="/"element={<News key="general"  pageSize={5} country='us' category='general'/>}></Route>
          <Route exact path="/business" element={<News key="business" pageSize={5} country='us' category='business'/>}></Route>
          <Route exact path="/entertainment"element={<News key="entertainment" pageSize={5} country='us' category='entertainment'/>}></Route>
          <Route exact path="/general"element={<News key="general" pageSize={5} country='us' category='general'/>}></Route>
          <Route exact path="/health"element={<News key="health" pageSize={5} country='us' category='health'/>}></Route>
          <Route exact path="/science"element={<News key="science" pageSize={5} country='us' category='science'/>}></Route>
          <Route exact path="/sports"element={<News key="sports" pageSize={5} country='us' category='sports'/>}></Route>
          <Route exact path="/technology"element={<News key="technology" pageSize={5} country='us' category='technology'/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
