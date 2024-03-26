import './index.css'

import {Component} from 'react'

import TabsList from '../TabsList'

import MatchItems from '../MatchItems'

class MatchGame extends Component {
  state = {
    activeTabId: 'FRUIT',
    timer: 60,
    topImageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    isGameCompleted: false,
    score: 0,
  }

  tick = () => {
    const {timer} = this.state
  
  
    if (timer===0) {
      clearInterval(this.timerId)
      this.setState({isGameCompleted: true})
    }else{
        this.setState({timer: timer - 1})
    }
  }

  timerstart = () => {
    this.timerId = setInterval(this.tick, 1000)
  }

  onClickingTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickingMatchItem = id => {
    const {imagesList} = this.props
    const {topImageId} = this.state
    if (topImageId === id) {
      const randomNumber = Math.floor(Math.random() * imagesList.length)
      this.setState(prevState => ({
        topImageId: imagesList[randomNumber].id,
        score: prevState.score + 1,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameCompleted: true})
    }
  }

  onClickingPlayAgainButton = () => {
    this.setState({
      activeTabId: 'FRUIT',
      timer: 60,
      topImageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      isGameCompleted: false,
      score: 0,
    })
  }

  render() {
    const {imagesList, tabsList} = this.props
    const {activeTabId, timer, topImageId, score, isGameCompleted} = this.state

    const filteredList = imagesList.filter(
      eachImageList => eachImageList.category === activeTabId,
    )

    if (timer === 60) {
      this.timerstart()
    }

    const topImageList = imagesList.filter(
      eachImageList => eachImageList.id === topImageId,
    )

    let bottomElement
    if (isGameCompleted === false) {
      bottomElement = (
        <div>
          <div className="match-image-container">
            <img
              src={topImageList[0].imageUrl}
              alt="match"
              className="match-image"
            />
          </div>
          <ul className="tabList-container">
            <TabsList
              eachTabList={tabsList[0]}
              key={tabsList[0].tabId}
              onClickingTab={this.onClickingTab}
              isActive={activeTabId === tabsList[0].tabId}
            />

            <TabsList
              eachTabList={tabsList[1]}
              key={tabsList[1].tabId}
              onClickingTab={this.onClickingTab}
              isActive={activeTabId === tabsList[1].tabId}
            />

            <TabsList
              eachTabList={tabsList[2]}
              key={tabsList[2].tabId}
              onClickingTab={this.onClickingTab}
              isActive={activeTabId === tabsList[2].tabId}
            />
          </ul>
          <ul className="image-items-container">
            {filteredList.map(eachImage => (
              <MatchItems
                eachImage={eachImage}
                key={eachImage.id}
                onClickingMatchItem={this.onClickingMatchItem}
              />
            ))}
          </ul>
        </div>
      )
    } else {
      bottomElement = (
        <div className="score-card-outside-container">
          <div className="scorecard-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
              alt="trophy"
              className="trophy-image"
            />
            <p>YOUR SCORE</p>
            <p>{score}</p>
            <div
              className="playagain-button"
              onClick={this.onClickingPlayAgainButton}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png "
                alt="reset"
                className="reset-image"
              />
              <button className="again-button">PLAY AGAIN</button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-container">
        <nav className="nav-bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="matchgame-logo"
          />
          <ul className="nav-right-container">
            <li>
                <p>
              Score: <span className="score-span">{score}</span>
            </p>
            </li>
           
            <li className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-image"
              />
              <p className="score-span">{timer} Sec</p>
            </li>
          </ul>
        </nav>
        {bottomElement}
      </div>
    )
  }
}

export default MatchGame
