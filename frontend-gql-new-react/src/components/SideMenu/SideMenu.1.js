import React, { useState, useContext} from 'react'
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
/**
 *  TODO: Make the list route based so we open the tree based on the url
 *  TODO: Make the list aware of the currentShownProductGroup from globalState
 */

function SideMenu(props) {
    const context = useContext(ShopContext);
    const [open, setOpen] = useState(false);
    const { productGroups, sortProducts, getAllProducts } = context;

    console.log(productGroups)


    return (
        <DivStyled>
            <ul>
            <li>
                <div 
                onClick={() => {
                    getAllProducts()
                    setOpen(false);
                }}
                >
                    Alle vores ting
                </div>
            </li>
                {/* <li><h2>{title}</h2></li> */}
                {productGroups.map((group, i) => {
                    if(group.parent_id === 0) {
                        return (
                            <li key={'liki' + i}>
                                <div 
                                onClick={() => setOpen(open === i ? false : i )}
                                >
                                    {group.title}
                                </div>
                                <Ul pose={open === i ? 'open' : 'closed'}>
                                    {productGroups.map((nestedGroup, i) => {
                                        // if(nestedGroup.parent_id === group.parent_id + 1) {
                                        if(nestedGroup.parent_id === group.id) {
                                            return (
                                                <li 
                                                key={'kili' + i} 
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
        </DivStyled>
    );
}

// export default withRouter(SideMenu);
export default SideMenu;