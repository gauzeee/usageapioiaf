import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skipRandom: false,
      selectedChar: 130
    };
    this.onSkipChar = this.onSkipChar.bind(this);
  }


  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  };

  onSkipChar() {
    this.setState(({ skipRandom }) => {
      return {
        skipRandom: !skipRandom
      };
    });
  }

  render() {
    const { skipRandom } = this.state;
    const buttonText = skipRandom ? "Show Random" : "Skip Random";
    const randomChar = skipRandom ? null : <RandomChar/>
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {randomChar}
              <button className='btn btn-primary mb-4'
                      onClick={this.onSkipChar}
              >
                {buttonText}
              </button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList onCharSelected={this.onCharSelected}/>
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
