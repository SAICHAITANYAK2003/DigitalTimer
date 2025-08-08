// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedinseconds: 0,
  timeLimitinMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillMount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalid)

  onDecrementTimer = () => {
    const {timeLimitinMinutes} = this.state
    if (timeLimitinMinutes > 1) {
      this.setState(prevState => ({
        timeLimitinMinutes: prevState.timeLimitinMinutes - 1,
      }))
    }
  }

  onIncrementTimer = () => {
    this.setState(prevState => ({
      timeLimitinMinutes: prevState.timeLimitinMinutes + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {timeLimitinMinutes, timeElapsedinseconds} = this.state
    const isButtonDisabled = timeElapsedinseconds > 0
    return (
      <div className="renderTimeLimitController-container">
        <p className="setTimer-title">Set Timer limit</p>
        <div className="set-timer-btn-conc">
          <button
            className="decrese-btn"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecrementTimer}
          >
            -
          </button>
          <p className="settimer-value">{timeLimitinMinutes}</p>
          <button
            className="decrese-btn"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncrementTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsed = () => {
    const {timeElapsedinseconds, timeLimitinMinutes} = this.state
    const isTimerCompleted = timeElapsedinseconds === timeLimitinMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedinseconds: prevState.timeElapsedinseconds + 1,
      }))
    }
  }

  onStartorPauseTimers = () => {
    const {
      isTimerRunning,
      timeElapsedinseconds,
      timeLimitinMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedinseconds === timeLimitinMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedinseconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalid = setInterval(this.incrementTimeElapsed, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const isRunningorstop = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    const isRunningorstopAlttext = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="renderTimerController-container">
        <div className="buttons-container">
          <div>
            <button
              className="time-controller-btn"
              type="button"
              onClick={this.onStartorPauseTimers}
            >
              <img
                src={isRunningorstop}
                className="pause-stop-icon"
                alt={isRunningorstopAlttext}
              />
              <p className="pause-stop-alt-icon">
                {isTimerRunning ? 'Pause' : 'Start'}
              </p>
            </button>
          </div>
          <div>
            <button
              className="time-controller-btn"
              type="button"
              onClick={this.onResetTimer}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                className="pause-stop-icon"
                alt="reset icon"
              />
              <p className="pause-stop-alt-icon">Reset</p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  getTimeFormatInSeconds = () => {
    const {timeElapsedinseconds, timeLimitinMinutes} = this.state
    const totalRemainingInSeconds =
      timeLimitinMinutes * 60 - timeElapsedinseconds
    const minutes = Math.floor(totalRemainingInSeconds / 60)
    const seconds = Math.floor(totalRemainingInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const label = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="main-container">
        <div className="digital-timer-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="elapsed-time-container">
            <h1 className="elapsed-time">{this.getTimeFormatInSeconds()}</h1>
            <p className="timer-state">{label}</p>
          </div>
        </div>
        <div className="controls-container">{this.renderTimerController()}</div>
        <div className="renderTimeLimitController-data-container">
          {this.renderTimeLimitController()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
