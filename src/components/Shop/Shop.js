import React, { useEffect, useState } from 'react';
import { addToDb, getStoreCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    

    useEffect( ()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data =>setProducts(data))
    }, [])
 

    useEffect( () => {
        const storeCart = getStoreCart();
        const saveCart = [];
        
        for(const id in storeCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storeCart[id]
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
            }
        }
        setCart(saveCart)
    }, [products])


    const handleAddToCart = (selectProduct) =>{
        console.log(selectProduct)
        let newCart = [];
        const exeist = cart.find(product => product.id === selectProduct.id);
        if(!exeist){
            selectProduct.quantity = 1;
            newCart = [...cart, selectProduct]

        }else{
            const rest = cart.filter(product => product.id !== selectProduct.id);
            exeist.quantity = exeist.quantity + 1;
            newCart = [...rest, exeist]
        }
       
       setCart(newCart);
       addToDb(selectProduct.id);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product 
                        key={product.id} 
                        product ={product}
                        handleAddToCart ={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="product-summary">
                <Cart cart={cart}></Cart>
               
            </div>
        </div>
    );
};

export default Shop;