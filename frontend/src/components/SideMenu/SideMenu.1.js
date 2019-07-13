import React, { Component } from 'react'
import styled from 'styled-components';
import ShopContext from '../context/shop-context'; 

const DivStyled = styled.div`

`

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: this.props.data,
            productGroups: [],
        }
    }

    static contextType = ShopContext;

    fetchgroups = async (apiUrl, putIt, extra = '', cb) => {

        fetch(apiUrl + extra)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {

            this.setState({
                [''+putIt]: data,
            })

            if(typeof cb === 'function') {
                cb(data)
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    buildGroupTree = arr => {
        const sortedArr = arr.sort((a,b) => a.parent_id - b.parent_id)
        const sortProducts = this.props.sortProducts;
        return (
            <ShopContext>
                <ul>
                    {/* <li><h2>{title}</h2></li> */}

                    {sortedArr.map((group, i) => {
                        if(group.parent_id === 0) {
                            return (
                                <li key={'liki' + i}>
                                    <div>
                                        {group.title}
                                    </div>
                                    <ul>
                                        {sortedArr.map((nestedGroup, i) => {
                                            // if(nestedGroup.parent_id === group.parent_id + 1) {
                                            if(nestedGroup.parent_id === group.id) {
                                                return (
                                                    <li key={'kili' + i} 
                                                    onClick={() => sortProducts(nestedGroup.id)}
                                                    style={{cursor: 'pointer'}}
                                                    >
                                                        {nestedGroup.title}
                                                    </li>
                                                )
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </li>
                            )
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </ShopContext>
        )
    }

    componentDidMount() {
        // this.fetchgroups('http://localhost:3500/product-groups/', 'productGroups');
        this.setState({
            productGroups: this.context.productGroups
        })
    }

    render() {
        const content = this.buildGroupTree(this.state.productGroups)
        
        // console.log(content)
        return (
            <DivStyled>{content}</DivStyled>
        )
    }
}