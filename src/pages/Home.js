import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Home.css'

const Home = () => {
  return (
    <Row>
        <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
        <div>
            <h1>Started</h1>
            <p>Content</p>
            <LinkContainer to="/chat">
                <Button variant='success'>Get Started <i className='fas fa-comments home-message-icon'></i></Button>               
            </LinkContainer>
        </div>
        </Col>
        <Col md={6} className="home_bg"></Col>
    </Row>
  )
}

export default Home
