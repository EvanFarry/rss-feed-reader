import React, { Component } from 'react';
import './App.css';

const Parser = require('rss-parser')
let parser = new Parser()

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      url: "",
      feeds: []
    }
  }

  handleChange(e){ this.setState({url: e.target.value}) }

  async handleSubmit(e){
    if (e.key === "Enter") {
      console.log('pressed enter');

      let rssObejct = await parser.parseURL(e.target.value)
      let items = rssObejct.items

      this.setState({feeds: items})
    }
  }

  async componentDidMount() {
    let mbmbam = "http://mbmbam.libsyn.com/rss"

    let feed = await parser.parseURL(mbmbam)
    let x = feed.items.slice(0,20)

    this.setState({ feeds: x })


  }//end did mount

  render() {
    return (
      <div className="App">
        <h1>RRS Feed Reader</h1>
        <label>
          RSS Feed URL:
          <input
            value={this.state.url}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleSubmit.bind(this)}
            />
        </label>
        <List feeds={this.state.feeds} />

      </div>
    );
  }
}

function List(props){

  let feed = props.feeds
  console.log(feed);
  let listItem = feed.map((item) =>
    <li key={item.guid}>
      <span>{item.title}</span>
      <span>
        <a href={item.enclosure.url} target="_blank">
          Listen
        </a>
      </span>
    </li>
  )

  return(
    <div>
      <p>Episodes: </p>
      <ul> {listItem} </ul>
    </div>
  )
}


export default App;
