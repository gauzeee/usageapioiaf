import React from 'react';
import {Col, Row} from 'reactstrap'
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage";
import gotService from '../../services/gotService'


export default class CharacterPage extends React.Component {

    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    };


    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    };

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState(({
            error: true
        }))
    }


    render() {

        if(this.state.error) return <ErrorMessage/>

        return(
            <Row>
                <Col md="6">
                    <ItemList getData={this.gotService.getAllCharacters} onCharSelected={this.onCharSelected}/>
                </Col>
                <Col md="6">
                    <CharDetails charId={this.state.selectedChar}/>
                </Col>
            </Row>
        )
    }
}