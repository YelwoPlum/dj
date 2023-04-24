import React from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
import Grid from "./component/Grid";


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