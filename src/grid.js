import "./index.css";
import React from 'react';
import {Howl, Howler} from 'howler';
import play from './play.png'
import pause from './pause.png'

class GridSquare extends React.Component {
    render() {
        {
            if(this.props.play) {
                return <button className="active" onClick={() => this.props.onClick()} />;
            } else {
                return <button className="grid-square" onClick={() => this.props.onClick()} />;
            }
        }
    }
}

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            gridSquares: [],
            tracks: [
                "drums.wav",
                "bas.wav",
                "bas.wav",
            ]
        };
        for(let i=0; i<15; i++) {
            this.state.gridSquares.push([false, false, false]);
        };
    };

    playOrPause() {
        if (this.state.playing) {
            return <img src={pause} className='img' />;
        } else {
            return <img src={play} className='img' />;
        }
    }

    playAudio(i) {
        console.log(i);
        for(let j=0; j<3; j++){
            if (this.state.gridSquares[i][j]){
                var track = new Howl({
                    src: [this.state.tracks[j]],
                })
                track.play();
            }
        }

        if (this.state.gridSquares[i].includes(true)){
            track.on("end", () => {
                this.playAudio(i+1);
            });
        }
    }


    handleClickPlayOrPause() {
        let playing = !this.state.playing;
        if (playing) {
    
            // do {
            //     for(let j=0; j<3; j++) {
            //         if(this.state.gridSquares[i][j]) {
            //             this.state.tracks[j].play()
            //             isPlaying = true;
            //             this.state.tracks[j].on("end", () => {
            //                 i++;
            //                 isPlaying = false;
            //                 console.log(i);
            //             });
            //         }
            //     }
            //     console.log(isPlaying);
            //     console.log(this.state.gridSquares.length);
            // }
            this.playAudio(0);
        }
        this.setState({playing: playing});
    }

    handleClickSquare(i, j) {
        let gridSquares = this.state.gridSquares.slice();
        gridSquares[i][j] = !gridSquares[i][j]

        this.setState({gridSquares: gridSquares});
    };

    renderGridSquare(i, j) {
        return <GridSquare 
                play={this.state.gridSquares[i][j]} 
                onClick={() => this.handleClickSquare(i, j)}/>
    };


    render() {
        let rows = [];
        for(let j=0; j<3; j++) {
            rows[j] = []
            for(let i=0; i< this.state.gridSquares.length; i++) {
                rows[j].push(this.renderGridSquare(i, j))
            }
        }

        return(
            <div>
                <div className="board-row">
                    <button className="square" onClick={() => this.handleClickPlayOrPause()}>
                        {this.playOrPause()}
                    </button>
                </div>
                <div className="board-row">
                    {rows[0]}
                </div>
                <div className="board-row">
                    {rows[1]}
                </div>
                <div className="board-row">
                    {rows[2]}
                </div>
            </div>
        )
    }
};