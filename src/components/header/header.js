import React from 'react';
import styled from 'styled-components';

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
                Game of Thrones DB
                </span>
                </HeaderTitle>
                <HeaderLinks>
                    <li>
                        <a onClick={() => {
                            this.props.openPage("Character")
                        }} href="#">Characters</a>
                    </li>
                    <li>
                        <a onClick={() => {
                            this.props.openPage("House")
                        }} href="#">Houses</a>
                    </li>
                    <li>
                        <a onClick={() => {
                            this.props.openPage("Book")
                        }} href="#">Books</a>
                    </li>
                </HeaderLinks>
            </HeaderBlock>
        );
    }
};
