import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinning from './Spinning';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
 capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
      constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalize(this.props.category)} -NewsMonkey`
       
      }
      async updateNews(){
        this.props.setProgress(0)
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url);
        this.props.setProgress(30)
        let passeddata= await data.json();
        this.props.setProgress(50)
        this.setState({articles:passeddata.articles,
          totalResults:passeddata.totalResults,
          loading:false})
          this.props.setProgress(100);
      }
       

      async componentDidMount(){
       /* console.log("cdm"); 
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url);
        let passeddata= await data.json();
        this.setState({articles:passeddata.articles,
          totalResults:passeddata.totalResults,
          loading:false})*/
          this.updateNews();
       
      }
     
      handlePrevClick=async()=>{
       
         /* let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true})
          let data= await fetch(url);
          let passeddata= await data.json();
          this.setState({
            page:this.state.page -1,
            articles:passeddata.articles,
            loading:false
          })*/
         this.setState({page:this.state.page -1})
         this.updateNews();
      }
      handleNextClick=async()=>{
        /*if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true})
          let data= await fetch(url);
          let passeddata= await data.json();
          
          this.setState({
            page:this.state.page +1,
            articles:passeddata.articles,
            loading:false
          })
        }*/
          this.setState({page:this.state.page +1})
          this.updateNews();
        }
        
        fetchMoreData = async () => {
          this.setState({page:this.state.page +1})
          const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cee0feb3ef2846cb864902800679beb8&page=${this.state.page}&pageSize=${this.props.pageSize}`
          {this.state.loading && <Spinning/>}
          
          let data= await fetch(url);
          let passeddata= await data.json();
          this.setState({articles:this.state.articles.concat(passeddata.articles),
            totalResults:passeddata.totalResults,})
       };
      

  render() {
    console.log("render");
   
    return (
     <>
        <h2 className="text-center">NewsMonkey- Top headlines on {this.capitalize(this.props.category)} category</h2>
       
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles!==this.state.totalResults }
          loader={<Spinning/>}
          
        >
      <div className="container">
        <div className="row" >
        {this.state.articles.map((element,zIndex)=>{
          return  <div className="col-md-4" key={`${element.url}-${zIndex}`}> 
          <Newsitem title={element.title?element.title.slice(0,45): ""} description={element.description?element.description.slice(0,88):''} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          
        })}

        </div>
        </div>
        </InfiniteScroll>
        
       {/* <div className=" container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr;Previous</button>
        <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>*/}
        
    </>
    )
  }
}


export default News