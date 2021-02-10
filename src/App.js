//https://image-search-3d130.web.app
import React, { Component } from 'react';
import Searcher from './components/Searcher'

class App extends Component {
  
  state = {
    termino: ""
  }

  datosBusqueda = termino => {
    this.setState({
      termino
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>

          <Searcher 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
      </div>
    );
  }
}

export default App;
