import React, { Component } from "react";
import styled from "styled-components";
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Term = styled.span`
  font-weight: bold;
`;

export default class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  gotService = new gotService();

  state = {
    char: {},
    loading: true,
    error: false
  };

  onCharLoded = char => {
    this.setState({ char, loading: false });
  };

  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updateChar() {
    const id = Math.floor(Math.random() * 140 + 25);
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoded)
      .catch(this.onError);
  }

  render() {
    const { char, loading, error } = this.state;
    const { skipRandom, onSkipShar } = this.props;

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || skipRandom) ? (
      <View char={char} />
    ) : null;
    const buttonText = skipRandom ? "Show Random" : "Skip Random";
    return (
      <>
        <RandomBlock className="rounded">
          {errorMesage}
          {spinner}
          {content}
        </RandomBlock>
        <button
          onClick={() => {
            onSkipShar();
          }}
        >
          {buttonText}
        </button>
      </>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died ? died : "Still alive"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
