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
      skipRandom: false
    };
    this.onSkipShar = this.onSkipShar.bind(this);
  }

  onSkipShar() {
    this.setState(({ skipRandom }) => {
      return {
        skipRandom: !skipRandom
      };
    });
  }

  render() {
    const { skipRandom } = this.state;
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              <RandomChar
                skipRandom={skipRandom}
                onSkipShar={this.onSkipShar}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
