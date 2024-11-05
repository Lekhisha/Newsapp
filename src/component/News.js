import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinning from './Spinning';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:'us',
    pageSize:8,
    category: 'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
  }
      constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            
        }
       
      }
      async componentDidMount(){
        console.log("cdm"); 
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url);
        let passeddata= await data.json();
        this.setState({articles:passeddata.articles,
          totalResults:passeddata.totalResults,
          loading:false})
       
      }
      handlePrevClick=async()=>{
       
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true})
          let data= await fetch(url);
          let passeddata= await data.json();
          this.setState({
            page:this.state.page -1,
            articles:passeddata.articles,
            loading:false
          })
      }
      handleNextClick=async()=>{
        if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true})
          let data= await fetch(url);
          let passeddata= await data.json();
          
          this.setState({
            page:this.state.page +1,
            articles:passeddata.articles,
            loading:false
          })
        }
        }
        

      

  render() {
    console.log("render");

    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey- Top headlines</h2>
       {this.state.loading && <Spinning/>}
        <div className="row" >
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}> 
          <Newsitem  title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,88):''} imageurl={element.urlToImage} newsurl={element.url}/>
          </div>
        })}
        </div>
        <div className=" container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr;Previous</button>
        <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}


export default News