import React, {Component} from "react";
import styled from "styled-components";
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const CharDetailsBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;
// .select-error {
//     color: #fff;
//     text-align: center;
//     font-size: 26px;
// }
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false,
        loading: true
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) return;
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char, loading: false})
            });
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }


    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    render() {

        console.log(this.state.char)
        if (!this.state.char) {
            return <span className='select-error btn btn-warning'>Please, select character</span>
        }

        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? (
            <View char={char}/>
        ) : null;


        return (
            <CharDetailsBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsBlock>
        );
    }
}

const View = ({char}) => {

    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
};
