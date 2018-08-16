import React from 'react'
import '../css/EpisodeList.css'

class EpisodeList extends React.Component {

  render(){
    let feed = this.props.feed
    let listItem = feed.map((item) =>
      <li key={item.guid}>
        <span className="title">{item.title}</span>
        <span className="listen"><a href={item.enclosure.url} target="_blank">
            Listen</a>
        </span>
      </li>
    )
    return(
      <div className="episodes">
        <h2>Episodes: </h2>
        <ul> {listItem} </ul>
      </div>
    )
  }
}

export default EpisodeList
