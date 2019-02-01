import React, { Component } from "react";
import styled from "styled-components";

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
  };

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) return;
    getData(itemId).then(item => {
      this.setState({ item });
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
    if (!this.state.item) {
      return (
        <span className="select-error btn btn-warning">
          Please, select something to show
        </span>
      );
    }
    console.log(this.state.item)
        const {item} = this.state;
      const {name} = item;
    return (
      <ItemDetailsBlock className="rounded">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
              {
                  React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, {item})
                  })
              }
          </ul>
      </ItemDetailsBlock>
    );
  }
}
