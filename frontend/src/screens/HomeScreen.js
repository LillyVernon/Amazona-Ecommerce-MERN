import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import data from '../data'
import axios from 'axios'

function HomeScreen() {
  const [products, setProducts]=useState([]);

  //useEffect to get data after rendering
  useEffect(()=>{
    const fetchData =async()=>{
      //axios fetch data from backend
      const result= await axios.get('/api/products');

      //set the state of the products with the data recieved from backend
      setProducts(result.data)
    };

    fetchData()
  }, []);
  return (
    <div>
         <h1> Featured Products</h1>
        <div className='products'>
        {
        products.map(product=>(
        <div className='product' key={product.slug}> 
        <Link   to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name}></img>
        </Link>
            <div className='product-info'> 
            <Link to={`/product/${product.slug}`}>
              <p> {product.name} </p>
            </Link>
              <p> <strong>  {product.price} </strong></p>
              <button> Add to cart</button>
            </div>
        </div>
        ))
        }
        </div>
    </div>
  )
}

export default HomeScreen
