import React, { Component } from "react";
import styled from "styled-components";
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../randomChar/randomChar";


const ItemListBlock = styled.ul`
  cursor: pointer;
`;
export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
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

    onError = err => {
        this.setState({
            error: true,
            loading: false
        });
    };

    render() {

        const { charList, error } = this.state;

        if(!charList && !error) {
            return <Spinner/>
        }

        if(error) {
            return <ErrorMessage/>
        }

        const items = this.renderItems(charList);

    return (
      <ItemListBlock className="item-list list-group">
          {items}
      </ItemListBlock>
    );
  }
}
