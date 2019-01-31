import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from "../../services/gotService";

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
          {/* <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row> */}
        </Container>
      </>
    );
  }
}
