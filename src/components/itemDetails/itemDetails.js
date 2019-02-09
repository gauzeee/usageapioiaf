import React, { Component } from "react";
import styled from "styled-components";
import Spinner from "../spinner";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

const ItemDetailsBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    error: false
  };

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) return;
    this.setState({ item: null, loading: true });
    getData(itemId).then(item => {
      this.setState({ item, loading: false });
    });
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    });
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    const { item } = this.state;
    const { name } = item;
    const { page } = this.props;
    const randomTitle = page ? `Random ${page}: ` : null;
    return (
      <ItemDetailsBlock className="rounded">
        <h4>
          {randomTitle}
          {name}
        </h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </ItemDetailsBlock>
    );
  }
}
