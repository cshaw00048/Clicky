import "./App.css";

import React, { Component } from "react";

import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import tiles from "./tiles.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isGuessCorrect: true,
      tiles: tiles,
      score: 0,
      maxScore: 12,
      topScore: 0,
      message: "CLICK AN IMAGE TO BEGIN!"
    };
  }

  removeAnimation = () => {
    let element = document.getElementById("animate-this");
    if (this.state.isGuessCorrect) {
      element.classList.remove("jello-vertical");
    }
    if (!this.state.isGuessCorrect) {
      element.classList.remove("shake-horizontal");
    }
  };

  addAnimation = isCorrect => {
    let element = document.getElementById("animate-this");
    if (isCorrect) {
      element.classList.add("jello-vertical");
    }

    if (!isCorrect) {
      element.classList.add("shake-horizontal");
    }
  };

  toggleAnimation = isCorrect => {
    if (isCorrect) {
      this.addAnimation(true);
      setTimeout(this.removeAnimation, 500);
    }

    if (!isCorrect) {
      this.addAnimation(false);
      setTimeout(this.removeAnimation, 500);
    }
  };


  handleSaveClick = id => {
    const tilez = this.state.tiles;
    const tileClicked = tilez.filter(tile => tile.id === id);

    if (!tileClicked[0].clicked) {
      tileClicked[0].clicked = true;
      this.handleCorrectClick();
      this.toggleAnimation(true);
      this.randomizeCharacters(tilez);

      this.setState({ tilez });
    } else {
      this.handleIncorrectClick();
      this.toggleAnimation(false);
    }
  };

  randomizeCharacters = characters => {
    characters.sort((a, b) => {
      return 0.5 - Math.random();
    });
  };

  handleCorrectClick = () => {
    this.setState({ isGuessCorrect: true });
    if (this.state.score + 1 > this.state.topScore) {
      this.setState({ topScore: this.state.topScore + 1 });
    }
    if (this.state.score + 1 >= this.state.maxScore) {
      this.setState({
        score: this.state.score + 1,
        message: "CONGRATS! YOU WIN!",
        messageClass: "correct"
      });
    } else {
      this.setState({
        score: this.state.score + 1,
        message: "YOU GUESSED CORRECTLY!",
        messageClass: "correct"
      });
    }
  };

  handleIncorrectClick = () => {
    this.setState({
      message: "INCORRECT. PLAY AGAIN?",
      isGuessCorrect: false
    });
    this.resetGame();
  };

  resetGame = id => {
    const tilez = this.state.tiles;
    for (let i = 0; i < tilez.length; i++) {
      tilez[i].clicked = false;
    }
    this.setState({ score: 0 });
  };


  render() {
    const { message, score, tiles, topScore } = this.state;
    return (
      <div className="fluid-container lodge h-100vh">
        <Navbar
          className="row"
          score={score}
          topScore={topScore}
          message={message}
        />
        <Header className="bg-header row" />

        <div className="d-flex justify-content-center main-content mx-auto padding-main flex-wrap row">
          {tiles.map(({ id, name, image, clicked }) => (
            <Card
              key={id}
              id={id}
              name={name}
              image={image}
              clicked={clicked}
              clickHandler={this.handleSaveClick}
            />
          ))}
        </div>

        <Footer className="footer-mgn row" />
      </div>
    );
  }
}

export default App;
