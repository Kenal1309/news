import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 2,
      totalResults: 0,
    };
    document.title = `${this.capital(this.props.category)} - NewsWala`;
  }

  // Badha ma ekjevo code hoy to aa rite function banavi ne code less kari sakay
  //   async updatenews(){
  //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2166c3b5bc4a49059bd0dcf8c9562826&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parseddata = await data.json();
  //     console.log(parseddata);
  //     this.setState({
  //       articles: parseddata.articles,
  //       totalResults: parseddata.totalResults,
  //       loading: false,
  //     });
  // }

  async componentDidMount() {
    console.log(this.state.page);
    this.props.setProgress(10);
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2166c3b5bc4a49059bd0dcf8c9562826&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseddata = await data.json();
    this.props.setProgress(80);
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

    // Avi Rite Function Banavi ne Code Ocho Kari Sakay
    // this.updatenews();
  }

  fetchMoreData = async () => {
    console.log(this.state.page);
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2166c3b5bc4a49059bd0dcf8c9562826&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
    });
  };

  // Button Mate Use Karelu Apde aa
  // handlenextclick = async () => {
  //   if (
  //     this.state.page + 1 >
  //     Math.ceil(this.state.totalResults / `${this.props.pageSize}`)
  //   ) {
  //   } else {
  //     console.log("next");
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apikey=2166c3b5bc4a49059bd0dcf8c9562826&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parseddata = await data.json();
  //     this.setState({ articles: parseddata.articles });
  //     this.setState({
  //       page: this.state.page + 1,
  //       loading: false,
  //     });
  //   }

  // Code Ocho Karva Function banavelu te
  // Code Ocho Kari sakay
  // this.setState({
  //   page: this.state.page + 1
  // });
  // this.updatenews();
  // };

  // handleprevclick = async () => {
  //   console.log("Previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apikey=2166c3b5bc4a49059bd0dcf8c9562826&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseddata = await data.json();
  //   console.log(parseddata);
  //   this.setState({ articles: parseddata.articles });
  //   this.setState({
  //     page: this.state.page - 1,
  //     loading: false,
  //   });

  // Code less  Mate Function
  // this.setState({
  //   page: this.state.page - 1
  // });
  // this.updatenews();
  // };

  render() {
    return (
      <>
        <h1 className="text-center"  style={{marginTop:'80px'}}>
          NewsWala - Top {this.capital(this.props.category)} Headline{" "}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div></div>
          <div className="row mx-2">
            {this.state.articles.map((elem) => {
              return (
                <div className="col-md-4 my-2 " key={elem.url}>
                  <NewsItem
                    title={
                      elem.title
                      // Apdu Amuk word j batava hoy to Title ma
                      // ? elem.title.length > 45
                      //   ? elem.title.slice(0, 45) + "..."
                      //   : elem.title.slice(0, 45) + "."
                      // : ""
                    }
                    description={
                      elem.description
                        ? // Apdu Amuk word j batava hoy to description ma
                          elem.description.length > 250
                          ? elem.description.slice(0, 250) + "..."
                          : elem.description.slice(0, 250) + "."
                        : ""
                    }
                    NewsUrl={elem.url}
                    imageUrl={
                      elem.urlToImage
                        ? elem.urlToImage
                        : "https://cdn.ndtv.com/common/images/ogndtv.png"
                    }
                    author={elem.author}
                    publishedAt={elem.publishedAt}
                    source={elem.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3 ">
          <button
          type="button"
          disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / `${this.props.pageSize}`)
            }
            className="btn btn-dark "
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
