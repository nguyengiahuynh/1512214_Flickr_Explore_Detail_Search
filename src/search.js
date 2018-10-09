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



const config = {
  containerWidth: 1150,
  containerPadding: 0,
  boxSpacing: {
    horizontal: 5,
    vertical: 5
  }
}

class Search extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      geometry: null,
      nextPage: 1,
      isLoading: false,
      search: null
    }
  }

  editSizeImage(data){
    return data.map((item) => {
        return {width: +item.width_m, height: +item.height_m}
    })
  }

  loadMore(){
    this.setState({
      isLoading: true
    })
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dddc7f158a499bb13fbc802f62c27dc0&tags=${this.props.match.params.tag}&format=json&nojsoncallback=1&per_page=20&page=${this.state.nextPage}&extras=tags%2Curl_m%2Cowner_name`)      .then(res => {
          this.setState({
            pictures: [...this.state.pictures,...res.data.photos.photo],
            nextPage: this.state.nextPage + 1 > res.totalPages ? false : this.state.nextPage + 1
          }, () => {
            this.setState({
              geometry: justifiedLayout(this.editSizeImage(this.state.pictures), config),
              isLoading: false
            })
          });
        })
  }

  handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 300;
    if (scrolledToBottom && this.state.nextPage && !this.state.isLoading) {
      this.loadMore();
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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll.bind(this));
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll.bind(this));
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dddc7f158a499bb13fbc802f62c27dc0&tags=${this.props.match.params.tag}&format=json&nojsoncallback=1&per_page=20&page=${this.state.nextPage}&extras=tags%2Curl_m%2Cowner_name`)
      .then(res => {
          this.setState({
            pictures: res.data.photos.photo,
            geometry: justifiedLayout(this.editSizeImage(res.data.photos.photo), config),
            nextPage: this.state.nextPage + 1,
          });
          })
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      pictures: [],
      geometry: null,
      nextPage: 1,
      isLoading: false,
      search: null
    })
    this.componentDidMount();
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
    <br/>
    <br/>
    <br/>
    <h3 className="text-center">Tags > {this.props.match.params.tag}</h3>
     <div className="container" style={{position: 'relative'}}>
     {!!this.state.pictures.length && this.state.pictures.map((item, key) => {
        return(
          <Link to={'/photo/' + item.id}>
          <div className="photo-view" key={key} style={this.state.geometry.boxes[key]}>
            <div className="interaction-view">
              <div className="photo-list-photo-interaction">
                <a className="overlay"> </a>
                <div className="interaction-bar">
                    <div className="text">
                      <a className="title">{item.title}</a>
                      <a className="attribution">by {item.ownername} - {item.views} views</a>
                    </div>
                </div>
              </div>
            </div>
            <img src={item.url_m} alt="img" />
          </div>
          </Link>
          )
        })
      }
      </div>
      </div>
    )
  }
}
export default Search;
