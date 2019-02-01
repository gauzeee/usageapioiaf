import React from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import gotService from "../../../services/gotService";
import RowBlock from "../../rowBlock";

export default class CharacterPage extends React.Component {
  gotService = new gotService();

  state = {
    charId: 130,
    error: false
  };

  onItemSelected = id => {
    this.setState({
        charId: id
    });
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) return <ErrorMessage />;

    const itemList = (
      <ItemList
        renderItem={({ name, gender }) => `${name}(${gender})`}
        getData={this.gotService.getAllCharacters}
        onItemSelected={this.onItemSelected}
      />
    );

    const charDetails = (
      <ItemDetails itemId={this.state.charId} getData={this.gotService.getCharacter}>
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
