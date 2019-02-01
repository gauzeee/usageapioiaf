import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage";
import gotService from "../../services/gotService";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage/housePage";

export default class App extends React.Component {
  state = {
    skipRandom: false,
    error: false
  };

  gotService = new gotService();

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

  render() {
    const { skipRandom } = this.state;
    const buttonText = skipRandom ? "Show Random" : "Skip Random";
    const randomChar = skipRandom ? null : <RandomChar />;

    if (this.state.error) return <ErrorMessage />;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {randomChar}
              <button
                className="btn btn-primary mb-4"
                onClick={this.onSkipChar}
              >
                {buttonText}
              </button>
            </Col>
          </Row>
          <CharacterPage />
          <BookPage/>
          <HousePage/>
        </Container>
      </>
    );
  }
}
