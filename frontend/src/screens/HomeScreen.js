import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
//import data from '../data'
import axios from 'axios'
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'

const reducer = (state, action) => {
  switch (action.type) {
    //sends ajax request to the backend
    case 'FETCH_REQUEST':
      return { ...state, loading: true }

    case 'FETCH_SUCCESS':
      //payload contains the data
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function HomeScreen() {
  //dispatch is use to call an action and update the state
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    //at the begining of the project, data is going to be fetched hence loading needs to be true
    products: [],
    loading: true,
    error: '',
  })
  // const [products, setProducts]=useState([]);

  //useEffect to get data after rendering
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        //axios fetch data from backend
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }

      //set the state of the products with the data recieved from backend
      //setProducts(result.data)
    }

    fetchData()
  }, [])
  return (
    <div>
      <h1> Featured Products</h1>
      <div className="products">
        {loading ? (
          <div> Loading... </div>
        ) : error ? (
          <div> {error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}> </Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
