import React from "react";
import play from '../play.png'
import pause from '../pause.png'

export default class Square extends React.Component {
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