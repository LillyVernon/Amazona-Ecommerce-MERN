import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from '../components/Rating'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import {Helmet} from 'react-helmet-async'
const reducer = (state, action) => {
  switch (action.type) {
    //sends ajax request to the backend
    case 'FETCH_REQUEST':
      return { ...state, loading: true }

    case 'FETCH_SUCCESS':
      //payload contains the data
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function ProductScreen() {
  const params = useParams()
  const { slug } = params
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    //at the begining of the project, data is going to be fetched hence loading needs to be true
    product: [],
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
        const result = await axios.get(`/api/products/slug/${slug}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }

      //set the state of the products with the data recieved from backend
      //setProducts(result.data)
    }

    fetchData()
  }, [slug])

  return loading ? (
    <div> loading .... </div>
  ) : error ? (
    <div> {error} </div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-larger"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title> {product.name}</title>{' '}
              </Helmet>
              <h1> {product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating>
                {' '}
                rating={product.rating} numReviews={product.numReviews}
              </Rating>
            </ListGroup.Item>
            <ListGroup.Item> Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              {' '}
              <p> {product.description} </p>{' '}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col> Price:</Col>
                    <Col> ${product.price} </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>{' '}
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
