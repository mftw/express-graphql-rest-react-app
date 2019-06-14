import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ShopContext from '../context/shop-context'; 
import posed from 'react-pose'

const DivStyled = styled.div`
    background: #f1f1f1;

    > ul {
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
`

const PosedUl = posed.ul({
    closed: { height: 0},
    open: { height: 'auto' }
})

const Ul = styled(PosedUl)`
    overflow: hidden;
`

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    static contextType = ShopContext;

    render() {
        // const content = this.buildGroupTree(this.state.productGroups)
        const sortProducts = this.props.sortProducts;
        const { open } = this.state;
        // console.log(this.props)
        return (
            // <DivStyled>{content}</DivStyled>
            // <div>
            <DivStyled>
                <ShopContext.Consumer>
                    {({productGroups}) => (
                        <ul>
                            {/* <li><h2>{title}</h2></li> */}
                            {productGroups.map((group, i) => {
                                if(group.parent_id === 0) {
                                    return (
                                        <li key={'liki' + i}>
                                            <div 
                                            onClick={() => this.setState({ open: open === i ? false : i })}
                                            >
                                                {group.title}
                                            </div>
                                            <Ul pose={open === i ? 'open' : 'closed'}>
                                                {productGroups.map((nestedGroup, i) => {
                                                    // if(nestedGroup.parent_id === group.parent_id + 1) {
                                                    if(nestedGroup.parent_id === group.id) {
                                                        return (
                                                            <li key={'kili' + i} 
                                                            onClick={() => sortProducts(nestedGroup.id, nestedGroup.title)}
                                                            style={{cursor: 'pointer'}}
                                                            >
                                                                {nestedGroup.title}
                                                            </li>
                                                        )
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </Ul>
                                        </li>
                                    )
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                    )}
                </ShopContext.Consumer>
            </DivStyled>
            //{/* </div> */}
        )
    }
}

// export default withRouter(SideMenu);
export default SideMenu;