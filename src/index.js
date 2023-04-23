

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Howl, Howler} from 'howler';
import './index.css';
import play from './play.png'
import pause from './pause.png'
import Grid from './grid.js';

class Square extends React.Component {
    playOrPause() {
        if (this.props.playing) {
            return <img src={pause} className='img' />;
        } else {
            return <img src={play} className='img' />;
        }
    }

    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()}>
            {this.playOrPause()}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: [
                {playing: false, sound: new Howl({src: ["drums.wav"], loop: true})},
                {playing: false, sound: new Howl({src: ["bas.wav"], loop: true})},
                {playing: false, sound: new Howl({src: ["bas.wav"]})},
            ]
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i].playing = !squares[i].playing;
        if (squares[i].playing) {
          for(let j=0; j<squares.length; j++) {
            if (squares[j].playing) {
              squares[j].sound.stop();
              squares[j].sound.play();
            }
          }
        } else {
          squares[i].sound.stop();
        }
        this.setState({squares: squares});
    }
    
    renderSquare(i) {
      return <Square playing={this.state.squares[i].playing} onClick={() => this.handleClick(i)}/>;
    }
  
    render() {
      let status;
      if (this.state.squares.some((val) => val.playing)) {
        status = 'Playing';
      } else {
        status = "Play";
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
        </div>
      );
    }
  }

  class Player extends React.Component {
    render () {
      return (
        <div>
          <Board/>
          <Grid/>
        </div>
      )
    }
  }
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Player/>);
  
  