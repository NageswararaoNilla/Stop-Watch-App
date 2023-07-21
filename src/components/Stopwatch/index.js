import {Component} from 'react'

import './index.css'

const initialState = {
  seconds: 0,
  isWatchRunning: false,
}

class StopWatch extends Component {
  state = initialState

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getTimer = () => {
    const {seconds} = this.state
    const elapsedMinutes = Math.floor(seconds / 60)
    const elapsedSeconds = Math.floor(seconds % 60)
    const minutesText =
      elapsedMinutes > 9 ? elapsedMinutes : `0${elapsedMinutes}`
    const secondsText =
      elapsedSeconds > 9 ? elapsedSeconds : `0${elapsedSeconds}`

    return `${minutesText}:${secondsText}`
  }

  onStart = () => {
    const {isWatchRunning} = this.state
    if (!isWatchRunning) {
      this.intervalId = setInterval(this.increaseTimer, 1000)
      this.setState({
        isWatchRunning: true,
      })
    }
  }

  increaseTimer = () => {
    const {isWatchRunning} = this.state
    if (isWatchRunning) {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onStop = () => {
    clearInterval(this.intervalId)
    this.setState({
      isWatchRunning: false,
    })
  }

  onReset = () => {
    this.setState(initialState)
    clearInterval(this.intervalId)
  }

  render() {
    const {isWatchRunning} = this.state
    return (
      <div className="app-container">
        <div className="stop-watch-container">
          <h1>Stopwatch</h1>
          <div className="stop-watch-box">
            <div className="timer-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="stopwatch-icon"
              />
              <p>Timer</p>
            </div>
            <h1>{this.getTimer()}</h1>
            <div className="buttons-container">
              <button
                type="button"
                className="btn bg-green"
                onClick={this.onStart}
                disabled={isWatchRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="btn bg-red"
                onClick={this.onStop}
              >
                Stop
              </button>
              <button
                type="button"
                className="btn bg-yellow"
                onClick={this.onReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StopWatch
