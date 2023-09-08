import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, NewsUrl, publishedAt, author, source } =
      this.props;
    return (
      <div className="card my-2 ">
        {/* // First Bange Mate */}
        {/* <span className ="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left: '90%', zIndex: '1'}}> */}
        <div style={{display: 'flex',position:'absolute', justifyContent:'flex-end',right:'0'}}>
        <span className =" badge rounded-pill bg-primary" >
          {source}
        </span>
        </div>
        <img
          src={imageUrl}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "180px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              Published By {author ? author : "Unknown"} at {" "}
              { new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a href={NewsUrl} target="_" className="btn btn-sn btn-dark">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
