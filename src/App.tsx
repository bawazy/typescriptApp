import React, { Component } from 'react'
import Search from './components/search'

export default class App extends Component {
  render() {
    return (
      <div>
  <Search  name='john Doe' numberOfPokemons={3}/>        
      </div>
    )
  }
}
