import React, { Component } from 'react';
import './App.css';
import Comment from './Comment';
import queryString from 'query-string';

const APIKEY = "YOUR-YOUTUBE-API-KEY";

class App extends Component {
  state = {}

  componentDidMount () {
    let _this = this;
    document.getElementById('get-it').addEventListener('click', function(){
      let url = document.getElementById('the-url').value;
      // 주소 입력 확인
      if(url) {
        let videoId = queryString.parse(url)['https://www.youtube.com/watch?v'] || url.split('https://youtu.be/')[1]; // 일반적 유튜브 주소 또는 단축 주소
        _this._getComments(videoId);
        return;
      }
      alert('주소를 입력해주세요!');
    });
  }
 
  _renderComments = () => {
    const comments = this.state.comments.map((comment) => {
      return <Comment img={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} title={comment.snippet.topLevelComment.snippet.authorDisplayName} text={comment.snippet.topLevelComment.snippet.textDisplay} key={comment.id}/>
    })
    return comments
  }

  _getComments = async (videoId, nextPageToken) => {
    const comments = await this._callApi(videoId, nextPageToken);
    nextPageToken ?
    this.setState((prev)=>({
      comments: prev.comments.concat(comments.items)
    })) :
    this.setState({
      comments: comments.items
    })

    setTimeout(()=>{
      if(comments.nextPageToken) {
        this._getComments(videoId, comments.nextPageToken);
      }
    },100);
  }

  _callApi = (videoId, nextPageToken) => {
    let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${APIKEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=100`;
    return fetch(nextPageToken ? url + `&pageToken=${nextPageToken}` : url)
    .then(data=> data.json())
    .then(res => {
      if(res.error) return alert('주소가 조금 이상한데요?? 다른 주소로 적어주세요!') 
      return res
    })
    .catch(err=> alert('주소가 조금 이상한데요?? 다른 주소로 적어주세요!'))
  }

  render() {
    return (
      <div className="App">
        {this.state.comments ? this._renderComments() : null}
      </div>
    );
  }
}

export default App;
