import React, { Component} from 'react'
// import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ShopContext from '../context/shop-context'; 
import posed, { PoseGroup } from 'react-pose'
// import { valueTypes } from 'popmotion';

const poseContainer = {
    default: {

        beforeChildren: true,
        // delayChildren: 1000,
        // staggerChildren: 5000,
    },
    enter: {
        // delayChildren: 1000,
        // beforeChildren: true,
        // staggerChildren: 100,
        // opacity: 1,
        // transition: {
            y: '0%',
            // x: '0%',
            // opacity: 1,
            transition: {
                y: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 20
                },
            },
        // }
        // staggerDirection: -1,
    },
    exit: {
        beforeChildren: true,
        y: '20%',

        // opacity: 0
        // height: "100%"
    }
}


const poseItem = {
    enter: { 
        // type: 'spring',
        y: '0%',
        // x: '0%',
        // opacity: 1,
        transition: {
            y: {
                type: 'spring',
                stiffness: 500,
                damping: 20
            },
        },
        // flip: false,

    },
    exit: { 
        // type: 'spring',
        // x: '100%',
        y: '20%',
        // flip: false,
    }
    
}

const Div = posed.div({
    ...poseContainer
})

const DivStyled = styled(Div)`
    width: 100%;
    background: #f1f1f1;
    > ul {
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
`

const PosedUl = posed.ul({
    closed: { height: 0},
    open: { height: 'auto' ,
    ...poseContainer
}
})

const UlRootCat = styled(PosedUl)`
    overflow: hidden;
`

const Li = posed.li(poseItem);

const posedLiContainer = posed.li(poseContainer)
const LiContainer = styled(posedLiContainer)`
    overflow: hidden;
`;
const Ul = posed.ul();
// const Ul = posed.ul({...poseContainer});


/**
 *  TODO: Make the list route based so we open the tree based on the url
 *  TODO: Make the list aware of the currentShownProductGroup from globalState
 */

class SideMenu extends Component {
    // const context = useContext(ShopContext);
    static contextType = ShopContext
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            productGroups: [],
            showEmpty: true,
        }
    }

    sortBadData = (dataToSort, showEmpty) => {
		// console.log("TCL: SideMenu -> sortBadData -> showEmpty", showEmpty)
        if(!dataToSort) {
            return []
        }
        let dataRoots = [...dataToSort];
		// console.log("TCL: SideMenu -> sortBadData -> dataRoots", dataRoots.length)
        let subCats = [...dataRoots];


        dataRoots = dataRoots.filter(data => data.parent_id === "0")

        subCats = subCats.filter(data => data.parent_id !== "0" && (showEmpty || data.productCount > 0))

        dataRoots = dataRoots.map(group => {
            // group.subCats = subCats.filter(cat => group.id === cat.parent_id)
            return {
                ...group,
                subCats: subCats.filter(cat => group.id === cat.parent_id )
            }
        })

        dataRoots = dataRoots.filter(group => (showEmpty || group.subCats.length > 0))
        return dataRoots
    }

    render() {
        const { open, showEmpty } = this.state;
        // console.log(productGroups)
        const { getAllProducts, productGroups, sortProducts } = this.context;
        // console.log(this.sortBadData(productGroups))
        // console.log(this.sortBadData(productGroups, true))
        const sortedData = this.sortBadData(productGroups, showEmpty)
		// console.log("TCL: SideMenu -> render -> sortedData", sortedData)
        // return (
        //     ''
        // )
        return (

            <DivStyled key='rootsubkeycontainer'>
                <Ul>
                <Li>
                    <div 
                    onClick={() => {
                        getAllProducts()
                        this.setState({open: false,});
                    }}
                    >
                        Alle vores ting
                    </div>
                </Li>
                {/* <li><h2>{title}</h2></li> */}
                {/* <React.Fragment key={'subkeycontainer'+i}> */}

                <LiContainer key='fucking-keys'>
                <PoseGroup>
                    {!!sortedData && !!sortedData.length > 0 &&
                       sortedData.map((group, i) => {
                            
                            
                            return (
                                    <Div key={'liki' + i}
                                    onClick={() => this.setState({open: open === i ? false : i })}
                                    >
                                    {group.title}
                                    
                                    <UlRootCat  pose={open === i ? 'open' : 'closed'}>
                                        {group.subCats.map((nestedGroup, i) => {
                                            
                                            return (
                                                <Li 
                                                key={'kili' + i} 
                                                onClick={() => sortProducts(nestedGroup.id, nestedGroup.title)}
                                                style={{cursor: 'pointer'}}
                                                >
                                                    {nestedGroup.title}
                                                </Li>
                                            )
                                        })}
                                    </UlRootCat>
                                    </Div>
                            )
                        }) 
                    }
                        </PoseGroup>
                    </LiContainer>
                        {/* </React.Fragment> */}

                <Li>
                    <button 
                    onClick={() => {
                        // getAllProducts()
                        this.setState({showEmpty: !this.state.showEmpty});
                    }}
                    >
                        {this.state.showEmpty ? 'Skjul Tomme' : 'Vis Tomme'}
                    </button>
                </Li>
                    </Ul>
            </DivStyled>

        );
    }
}

// export default withRouter(SideMenu);
export default SideMenu;