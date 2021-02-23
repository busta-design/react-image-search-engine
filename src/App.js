//https://image-search-3d130.web.app
import React, { Component } from 'react';
import Searcher from './components/Searcher'
import Resultado from './components/Resultado'

class App extends Component {
  
  state = {
    termino: "",
    imagenes: [],
    pagina: '',
  }

  /** Es para que vaya al principio de la pagin al pasar la pag */
  scrollTop = () => {
    const elemento = document.querySelector('.jumbotron')
    elemento.scrollIntoView('smooth', 'start')
  }

  /** 
    *Metodos que permite que el hijo 'Resultado' -> 'Paginacion' 
    *se comunique con el padre 'App
  **/
  paginaAnterior = () => {
    // console.log('anterior...')
    
    /*Leer state de la pagina actual*/ 
    let pagina = this.state.pagina
    /*Leer si la pagina es 1, ya no ir hacia atras*/
    if(pagina === 1) return null
    /*Sumar uno a la pagina actual*/ 
    pagina--
    /*Agregar el cambio al state*/ 
    this.setState({pagina}, () => this.consultarApi()) //llamamos a consultar api para que se refresque la busquena de pagina

    this.scrollTop()//volver al principio
  }
  paginaSiguiente = () => {
    // console.log('siguiente...')
    
    /*Leer state de la pagina actual*/ 
    let pagina = this.state.pagina
    /*Sumar uno a la pagina actual*/ 
    pagina++
    /*Agregar el cambio al state*/ 
    this.setState({pagina}, () => this.consultarApi()) //llamamos a consultar api para que se refresque la busquena de pagina
    
    this.scrollTop()//volver al principio

  }

  consultarApi = () => {
    const termino = this.state.termino
    const pagina = this.state.pagina
    const url = `https://pixabay.com/api/?key=20391421-2d296a6914b629f7a5f204eab&q=${termino}&per_page=30&page=${pagina}`
    // console.log(url)

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))
  }

  datosBusqueda = termino => {
    this.setState({
      termino,
      pagina: 1,
    }, () => this.consultarApi())
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
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
          
        </div>
      </div>
    );
  }
}

export default App;
