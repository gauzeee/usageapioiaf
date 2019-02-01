import React from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class HousePage extends React.Component {
    gotService = new gotService();

    state = {
        houseId: 130,
        error: false
    };

    onItemSelected = id => {
        this.setState({
            houseId: id
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
                renderItem={({ name }) => `${name}`}
                getData={this.gotService.getAllHouses}
                onItemSelected={this.onItemSelected}
            />
        );

        const houseDetails = (
            <ItemDetails itemId={this.state.houseId} getData={this.gotService.getHouse}>
                <Field field="region" label="Region" />
                <Field field="words" label="Words" />
                <Field field="titles" label="Titles" />
                <Field field="currentLord" label="Current Lord" />
                <Field field="coatOfArms" label="Coat of Arms" />
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={houseDetails} />;
    }
}
