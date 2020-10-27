import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';



function hanoiSolver(n, start, destination, support) {
  if (n == 1) {
    return [[start, destination]]
  } else {
    let primiPassi = hanoiSolver(n - 1, start, support, destination)
    let passoMedio = [[start, destination]]
    let ultimoPasso = hanoiSolver(n - 1, support, destination, start)
    return primiPassi.concat(passoMedio, ultimoPasso)
  }
}




class App extends React.Component {
  constructor(props) {
    super(props);
    // If we want to change n, here is one parameter to change
    this.state = {
      sol: hanoiSolver(6, 0, 2, 1), mossa: 0, a: [6, 5, 4, 3, 2, 1], b: [], c: [],
      altezze: ["h1", "h2", "h3", "h4", "h5", "h6"], colonne: ["c1", "c1", "c1", "c1", "c1", "c1"]
    }
    this.changeDisplay = this.changeDisplay.bind(this)
    this.wholeGame = this.wholeGame.bind(this)
    this.eseguiUnaMossa = this.eseguiUnaMossa.bind(this)
  }



  // a,b,c sono i 3 array a cui dobbiamo applicare mossaDaFare, [0,1] ad esempio
  changeDisplay(primaCol, secCol, terCol, mossaDaFare) {
    let [primo, secondo] = mossaDaFare;
    var eliminato;

    var a = Array.from(primaCol)
    var b = Array.from(secCol)
    var c = Array.from(terCol)

    if (primo == 0 && secondo == 1) {
      eliminato = a.pop()
      b.push(eliminato)
    } else if (primo == 0 && secondo == 2) {
      eliminato = a.pop()
      c.push(eliminato)
    } else if (primo == 1 && secondo == 2) {
      eliminato = b.pop()
      c.push(eliminato)
    } else if (primo == 1 && secondo == 0) {
      eliminato = b.pop()
      a.push(eliminato)
    } else if (primo == 2 && secondo == 0) {
      eliminato = c.pop()
      a.push(eliminato)
    } else if (primo == 2 && secondo == 1) {
      eliminato = c.pop()
      b.push(eliminato)
    }

    var dicColumns = { 0: this.state.a, 1: this.state.b, 2: this.state.c }
    var altezzaEliminato = 6 - dicColumns[secondo].length
    console.log("altezzaEliminato-1", dicColumns[secondo].length)

    // eliminato: devo cambiare attributo colonna in "secondo"
    let colonneDeepCopy = Array.from(this.state.colonne)
    colonneDeepCopy[eliminato - 1] = "c" + (secondo + 1)
    //console.log("c" + (secondo + 1))
    //console.log(colonneDeepCopy)
    // e devo cambiargli l'attributo altezza in "h"+altezza
    let altezzaDeepCopy = Array.from(this.state.altezze);
    altezzaDeepCopy[eliminato - 1] = "h" + altezzaEliminato
    console.log(altezzaDeepCopy)
    console.log("a:", a)
    console.log("b:", b)
    console.log("c:", c)

    this.setState({ altezze: altezzaDeepCopy, colonne: colonneDeepCopy, mossa: this.state.mossa + 1 });

    this.setState({ a: a, b: b, c: c })

  }

  eseguiUnaMossa(n) { // n è la mossa n-esima. per n=0 fino alla lunghezza di "sol" meno uno
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        this.changeDisplay(this.state.a, this.state.b, this.state.c, this.state.sol[n]);
        resolve()
      }
        , 200))

  }



  async wholeGame() { // Esegue tutte le mosse

    const numeroMosse = this.state.sol.length
    for (let k = 0; k < numeroMosse; k++) {
      await this.eseguiUnaMossa(k)
    }
  }




  // If we want more disks, also change something here
  render() {
    return (
      <div>
        <div className="gameContainer">
          <br></br>
          <br></br>
          <br></br>

          <span className="vertical vl1"></span>
          <span className="vertical vl2"></span>
          <span className="vertical vl3"></span>

          <span className={"disk" + " " + this.state.altezze[0] + " " + this.state.colonne[0]} id="n1">1</span>
          <span className={"disk" + " " + this.state.altezze[1] + " " + this.state.colonne[1]} id="n2">2</span>
          <span className={"disk" + " " + this.state.altezze[2] + " " + this.state.colonne[2]} id="n3">3</span>
          <span className={"disk" + " " + this.state.altezze[3] + " " + this.state.colonne[3]} id="n4">4</span>
          <span className={"disk" + " " + this.state.altezze[4] + " " + this.state.colonne[4]} id="n5">5</span>
          <span className={"disk" + " " + this.state.altezze[5] + " " + this.state.colonne[5]} id="n6">6</span>
        </div>
        <div>
          <button onClick={this.wholeGame}>Start The Game</button>
        </div>
      </div >
    )
  }
}

export default App;
