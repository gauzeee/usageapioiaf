import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage/housePage";
import gotService from "../../services/gotService";

export default class App extends React.Component {

  gotService = new gotService();

  state = {
    currentPage: 'Characters',
    skipRandom: false,
    error: false
  };

  openPage = (page) => {
    this.setState({
      currentPage: page
    })
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    });
  }

  onSkipChar = () => {
    this.setState(({ skipRandom }) => {
      return {
        skipRandom: !skipRandom
      };
    });
  };

  setCurrentPage() {
    let current;
    let data;
    switch (this.state.currentPage) {
      case "Character" :
        current = <CharacterPage/>
        data = `${this.gotService.getCharacter}`;
        break;

      case "House" :
        current = <HousePage/>
        data = `${this.gotService.getHouse}`;;
        break;

      case "Book" :
        current = <BookPage/>
        data = `${this.gotService.getBook}`;
        break;

      default :
        current = <CharacterPage/>
        data = `${this.gotService.getCharacter}`;
        break;
    }
    return {
      current,
      data
    };
}

  render() {
    const { skipRandom } = this.state;
    const randomChar = skipRandom ? null : <RandomChar skipRandom={this.state.skipRandom}  page={this.state.currentPage}/>;
    const buttonText = skipRandom ? "Show Random" : "Skip Random";

    if (this.state.error) return <ErrorMessage />;

    const currentPage = this.setCurrentPage().current;

    return (
      <>
        <Container>
          <Header openPage={this.openPage}/>
        </Container>
        <Container>
          {randomChar}
          <button
              className="btn btn-primary mb-4"
              onClick={this.onSkipChar}
          >
            {buttonText}
          </button>
          {currentPage}
        </Container>
      </>
    );
  }
}
