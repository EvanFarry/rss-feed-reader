//React
import React, { Component } from 'react';
import './App.css';

//my components
import EpisodeList from './components/EpisodeList'

//rss feed parser
const Parser = require('rss-parser')
let parser = new Parser()

class App extends Component {

  constructor(props){
    super(props)
    this.state = { url: "http://www.blubrry.com/feeds/the_glass_cannon.xml", feed: [] }
  }

  handleChange(e){ this.setState({url: e.target.value}) }

  async handleSubmit(e){
    if (e.key === "Enter") {
      let rssUrl = e.target.value.replace('http', 'https')
      let rssObejct = await parser.parseURL(rssUrl)
      let items = rssObejct.items

      this.setState({feed: items})
    }
  }

  render() {
    return (
      <div className="App">
        <h1>RRS Feed Reader</h1>
        <label>RSS Feed URL:
          <input
            value={this.state.url}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleSubmit.bind(this)}
            />
        </label>
        <EpisodeList feed={this.state.feed} />
      </div>
    );
  }
}



export default App;
