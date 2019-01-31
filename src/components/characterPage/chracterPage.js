import React from "react";
import { Col, Row } from "reactstrap";
import ItemList from "../itemList";
import CharDetails, { Field } from "../charDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class CharacterPage extends React.Component {
  gotService = new gotService();

  state = {
    selectedChar: 130,
    error: false
  };

  onItemSelected = id => {
    this.setState({
      selectedChar: id
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
      <CharDetails charId={this.state.selectedChar}>
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
      </CharDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
