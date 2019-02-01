import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

export default  class Header extends React.Component {

    render() {
        return (
            <HeaderBlock>
                <HeaderTitle>
                <span>
                    <Link to="/"> Game of Thrones DB </Link>
                </span>
                </HeaderTitle>
                <HeaderLinks>
                    <li>
                        <Link to="/characters/" onClick={() => {
                            this.props.openPage("Character")
                        }} >Characters</Link>
                    </li>
                    <li>
                        <Link to="/houses/" onClick={() => {
                            this.props.openPage("House")
                        }} href="#">Houses</Link>
                    </li>
                    <li>
                        <Link to="/books/" onClick={() => {
                            this.props.openPage("Book")
                        }} href="#">Books</Link>
                    </li>
                </HeaderLinks>
            </HeaderBlock>
        );
    }
};
