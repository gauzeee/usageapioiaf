import React from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";
import {withRouter} from 'react-router-dom'

class BookPage extends React.Component {
    gotService = new gotService();

    state = {
        error: false
    };

    // onItemSelected = id => {
    //     this.setState({
    //         bookId: id
    //     });
    // };

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
                renderItem={({ name, publisher }) => `${name} (${publisher})`}
                getData={this.gotService.getAllBooks}
                onItemSelected={(itemId) => {
                    this.props.history.push(`${itemId}`)
                }}
            />
        );

        const bookDetails = (
            <ItemDetails itemId={this.state.bookId} getData={this.gotService.getBook}>
                <Field field="publisher" label="Publisher" />
                <Field field="numberOfPages" label="Number Of Pages" />
                <Field field="released" label="Released" />
            </ItemDetails>
        );

        return itemList;
    }
}

export default withRouter(BookPage)