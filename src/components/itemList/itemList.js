import React, { Component } from "react";
import styled from "styled-components";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";


const ItemListBlock = styled.ul`
  cursor: pointer;
`;
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {

        const {getData}  = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
            .catch(this.onError)
    }

    renderItems(arr) {
        return arr.map((item) => {
            return (
                <li className="list-group-item" key={item.id} onClick={() => {this.props.onCharSelected(item.id)}}>
                    {item.name}
                </li>
            )
        })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    onError = err => {
        this.setState({
            error: true,
            loading: false
        });
    };

    render() {

        const { itemList, error } = this.state;

        if(!itemList && !error) {
            return <Spinner/>
        }

        if(error) {
            return <ErrorMessage/>
        }

        const items = this.renderItems(itemList);

    return (
      <ItemListBlock className="item-list list-group">
          {items}
      </ItemListBlock>
    );
  }
}
