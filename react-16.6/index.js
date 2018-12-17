import React from "react";
import ReactDOM from "react-dom";

//
const dotStyle = {
  position: "absolute",
  background: "#61dafb",
  font: "normal 15px sans-serif",
  textAlign: "center",
  cursor: "pointer"
};

const containerStyle = {
  position: "absolute",
  transformOrigin: "0 0",
  left: "50%",
  top: "50%",
  width: "10px",
  height: "10px",
  background: "#eee"
};

const targetSize = 25;

class Dot extends React.Component {
  constructor() {
    super();
    this.state = { hover: false };
  }
  enter() {
    this.setState({
      hover: true
    });
  }
  leave() {
    this.setState({
      hover: false
    });
  }
  render() {
    var props = this.props;
    var s = props.size * 1.3;
    var style = {
      ...dotStyle,
      width: s + "px",
      height: s + "px",
      left: props.x + "px",
      top: props.y + "px",
      borderRadius: s / 2 + "px",
      lineHeight: s + "px",
      background: this.state.hover ? "#ff0" : dotStyle.background
    };
    return (
      <div
        style={style}
        onMouseEnter={() => this.enter()}
        onMouseLeave={() => this.leave()}
      >
        {this.state.hover ? "*" + props.text + "*" : props.text}
      </div>
    );
  }
}

class Triangle extends React.PureComponent {
  render({ x, y, s, seconds }) {
    if (s <= targetSize) {
      return (
        <Dot
          x={x - targetSize / 2}
          y={y - targetSize / 2}
          size={targetSize}
          text={seconds}
        />
      );
    }

    const slowDown = true;
    if (slowDown) {
      let e = performance.now() + 0.8;
      while (performance.now() < e) {
        // delay
      }
    }

    return (
      <React.Fragment>
        <Triangle seconds={seconds} x={x} y={y - s / 4} s={s / 2} />
        <Triangle seconds={seconds} x={x - s} y={y + s / 4} s={s / 2} />
        <Triangle seconds={seconds} x={x + s} y={y + s / 4} s={s / 2} />
      </React.Fragment>
    );
  }
}

function App({ elapsed }) {
  const t = (elapsed / 1000) % 10;
  const seconds = Math.floor(t);
  const scale = 1 + (t > 5 ? 10 - t : t) / 10;
  const transform = `scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)`;
  return (
    <div>
      <div style={{ ...containerStyle, transform }}>
        <div>
          <Triangle x={0} y={0} s={1000} seconds={seconds} />
        </div>
      </div>
    </div>
  );
}

//

const $container = document.getElementById("container");
const start = new Date().getTime();

function update() {
  ReactDOM.render(<App elapsed={new Date().getTime() - start} />, $container);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
