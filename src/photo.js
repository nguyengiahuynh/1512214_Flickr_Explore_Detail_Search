import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import justifiedLayout from 'justified-layout';
import InfiniteScroll from 'react-infinite-scroller';
import {
BrowserRouter,
Route,
Link
} from 'react-router-dom';
import './App.css';

class Photo extends Component {
  constructor(){
    super();
    this.state = {
      picture: null,
      user: null,
      tags: [],
      search: null
    }
  }

  handleChange(e){
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const {history} = this.props
    if(this.state.search !== ''){
      history.push(`/photo/tags/${this.state.search}`)
    }
  }

  componentDidMount() {
    let us = axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=dddc7f158a499bb13fbc802f62c27dc0&format=json&nojsoncallback=1&photo_id=${this.props.match.params.id}`)
    let pic = axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=dddc7f158a499bb13fbc802f62c27dc0&format=json&nojsoncallback=1&photo_id=${this.props.match.params.id}`)
    return Promise.all([us, pic]).then(([us, pic]) => {
      console.log(us);
      this.setState({
        tags: us.data.photo.tags.tag,
        picture: pic.data.sizes.size[5].source,
        user: us,
      });
    })
  }


  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link to="/" className="nav-link">Flickr</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/explore" className="nav-link">Explore</Link>
            </li>
          </ul>
        </div>
        <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit.bind(this)}>
          <input class="form-control mr-sm-2" type="search" placeholder='Search' value={this.state.search} onChange={this.handleChange.bind(this)} aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit.bind(this)}>Search</button>
        </form>
      </nav>
      {this.state.user && this.state.picture &&
        <div> 
          <div className="container-fluid text-center bg-darkless">
            <img src={this.state.picture} className="img-responsive" alt="Responsive image"/>
          </div>
          <div className="row container-fluid">
            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
              <h3><strong>{this.state.user.data.photo.owner.realname}</strong></h3>
              <h5>{this.state.user.data.photo.title._content}</h5>
              <p dangerouslySetInnerHTML={{ __html: this.state.user.data.photo.description._content}}></p>
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      {this.state.user.data.photo.views}
                      <h5>Views</h5>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      {this.state.user.data.photo.comments._content}
                      <h5>Comments</h5>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  Tags: 
                {this.state.tags.map((item, key) => {
                  return (
                        <Link to={'/photo/tags/' + item.raw} className="tag">{item.raw}</Link>
                  )
                })
                }
            </div>
          </div>
        </div>  
      }
      </div>
    )
  }
}
export default Photo;
