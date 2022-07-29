import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
//import data from '../data'
import axios from 'axios'
import logger from 'use-reducer-logger';

const reducer = (state, action) =>{
  switch(action.type){
    //sends ajax request to the backend
    case 'FETCH_REQUEST':
      return{...state,loading:true};

    case 'FETCH_SUCCESS':
      //payload contains the data
      return{...state, products:action.payload, loading:false};
    case 'FETCH_FAILED':
      return{...state, loading:false, error:action.payload}
    default:
      return state;
  }
}

function HomeScreen() {
  //dispatch is use to call an action and update the state
  const [{loading, error, products}, dispatch]=useReducer(logger(reducer), {
    //at the begining of the project, data is going to be fetched hence loading needs to be true
    products:[],
    loading:true, 
    error:''
  })
 // const [products, setProducts]=useState([]);

  //useEffect to get data after rendering
  useEffect(()=>{
    const fetchData =async()=>{
      dispatch({type:'FETCH_REQUEST'})
      try {
         //axios fetch data from backend
      const result= await axios.get('/api/products');
      dispatch({type:'FETCH_SUCCESS', payload:result.data})
      } catch (error) {
        dispatch({type:'FETCH_FAIL', payload: error.message});
      }
     

      //set the state of the products with the data recieved from backend
      //setProducts(result.data)
    };

    fetchData()
  }, []);
  return (
    <div>
         <h1> Featured Products</h1>
        <div className='products'>
        {
          loading? (<div> Loading </div>)
          :
          error? (<div> {error}</div>)
          :(
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
        )))
        }
        </div>
    </div>
  )
}

export default HomeScreen
