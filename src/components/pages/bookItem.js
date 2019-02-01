import React from 'react';
import gotService from "../../services/gotService";
import {Field} from "../itemDetails";
import ItemDetails from "../itemDetails";
import {Link} from "react-router-dom";


export default class BookItem extends React.Component {
    gotService = new gotService();

    render() {
        return(
            <>
        <ItemDetails itemId={this.props.bookId} getData={this.gotService.getBook}>
            <Link className="btn btn-primary" to="/books/">Back</Link>
            <Field field="publisher" label="Publisher" />
            <Field field="numberOfPages" label="Number Of Pages" />
            <Field field="released" label="Released" />
        </ItemDetails>
                </>
        )
    }
}