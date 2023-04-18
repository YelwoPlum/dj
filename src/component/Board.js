import React from "react";
import {Howl, Howler} from 'howler';
import Square from './Square';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: [
                {playing: false, sound: new Howl({src: ["../drums.wav"], loop: true})},
                {playing: false, sound: new Howl({src: ["../bas.wav"], loop: true})},
                {playing: false, sound: new Howl({src: ["../bas.wav"]})},
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
  