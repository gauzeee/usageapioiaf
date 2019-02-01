import React, { Component } from "react";
import styled from "styled-components";
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import {Col, Row} from "reactstrap";
import ItemDetails, {Field} from "../itemDetails";

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

    console.log('Constructor')
  }

  gotService = new gotService();

  state = {
    item: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 4500)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoded = item => {
    this.setState({ item, loading: false });
  };

  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updateChar = () => {
    let id = Math.floor(Math.random() * 120 + 25);
    const {page} = this.props;
    let getData;
    switch (page) {
        case "Book" :
            getData = this.gotService.getBook;
            id = id > 10 ?  Math.floor(Math.random() * (10 - 1)) + 1 : 1
            break;
        case "House" :
            getData = this.gotService.getHouse;
            break;
        default :
            getData = this.gotService.getCharacter;
            break;
      }
    getData(id)
      .then(this.onCharLoded)
      .catch(this.onError);
  };

  render() {

      if (this.state.error) return <ErrorMessage />;

    console.log('Render');

    const { item, loading, error } = this.state;
    const {page} = this.props;

    const View = ({item}) => {
        switch (page) {
            case "House" :
                return(
                    <ItemDetails page={this.props.page} itemId={item.id} getData={this.gotService.getHouse}>
                        <Field field="region" label="Region" />
                        <Field field="words" label="Words" />
                        <Field field="titles" label="Titles" />
                        <Field field="currentLord" label="Current Lord" />
                        <Field field="coatOfArms" label="Coat of Arms" />
                    </ItemDetails>
                );
            case "Book" :
                return(
                    <ItemDetails page={this.props.page} itemId={item.id} getData={this.gotService.getBook}>
                        <Field field="publisher" label="Publisher" />
                        <Field field="numberOfPages" label="Number Of Pages" />
                        <Field field="released" label="Released" />
                    </ItemDetails>
                );
            default :
                return(
                    <ItemDetails page={this.props.page} itemId={item.id} getData={this.gotService.getCharacter}>
                        <Field field="gender" label="Gender" />
                        <Field field="born" label="Born" />
                        <Field field="died" label="Died" />
                        <Field field="culture" label="Culture" />
                    </ItemDetails>
                );
        }
    }



    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View item={item} />
    ) : null;
    return (
        <Row>
            <Col lg={{ size: 5, offset: 0 }}>
                <RandomBlock className="rounded">
                    {errorMesage}
                    {spinner}
                    {content}
                </RandomBlock>
            </Col>
        </Row>

    );
  }
}
