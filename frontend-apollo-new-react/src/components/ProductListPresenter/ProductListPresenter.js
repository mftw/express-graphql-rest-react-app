import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import styled from 'styled-components';
// import { sortByKey } from '../Helpers/Helpers';
import ProductCard from '../ProductCard/ProductCard';

import posed, { 
    PoseGroup 
} from 'react-pose';

import ShopContext from '../context/shop-context';

const PosedDiv = posed.div({
    // default: {

    //     // beforeChildren: true,
    //     delayChildren: 1000,
    //     staggerChildren: 5000,
    // },
    enter: {
        // delayChildren: 1000,
        beforeChildren: true,
        staggerChildren: 100,
        opacity: 1,
        // transition: {

        // }
        // staggerDirection: -1,
    },
    exit: {
        beforeChildren: true,
        opacity: 0
        // height: "100%"
    }
})

const Div = styled(PosedDiv)`
    display: grid;
    /* padding:  */
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    grid-gap: 1rem;
    padding: 1rem;
    min-height: 95vh;
    @media screen and (max-width: 700px){
        grid-template-columns: repeat(3, 1fr);
    }
    /* position: relative;
    min-height: 100%;
    min-width: 100%; */
`

// const NDiv = posed.div()

const PDiv = posed.div({
    enter: { 
        // type: 'spring',
        y: '0%',
        // x: '0%',
        opacity: 1,
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
    
})

const ChildDiv = styled(PDiv)`
    opacity: 0;
`


export default class ProductListPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // products: [],
            products: this.props.products || [],
            // fetching: false,
        }
    }

    static contextType = ShopContext;

    componentWillReceiveProps(props) {
        this.setState({
            ...props,
        })
    }

    render() {
        // const { products } = this.state;
        // const { currentShownGroup, products, isLoading } = this.context;
        const { shownGroup: currentShownGroup, products } = this.props.data;
        // const sortedProducts = sortByKey(products, 'brand');
        const sortedProducts = products || [];
        // const ProductToShow = this.getProducts();
        // console.log(this.props)
         
        return (
            <div style={{minHeight: '95vh', }}>
                <h2>{currentShownGroup.title}</h2>
                <h3>{currentShownGroup.description}</h3>
                {/* {isLoading ? <div> loading </div> : 
                } */}
                    <PoseGroup>
                        <Div key={'pose-bitch' + currentShownGroup}>

                             
                                    {sortedProducts.map((product, i) => {
                                        // return <Product {...product} product={product} key={'product' + i} />
                                        // return <ProductCard {...product} product={product} key={'product' + i} />
                                        return <ChildDiv key={'product' + i + currentShownGroup}><ProductCard {...product} product={product} /></ChildDiv>
                                    })}
                             
                                
                            
                                {/* <ProductToShow key={'pose-fuck'}/> */}
                        </Div>
                    </PoseGroup>
            </div>
        )
    }
}