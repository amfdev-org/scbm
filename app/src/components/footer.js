import React from 'react'
//import { connect } from 'react-redux';
//import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button'
//import Spinner from 'react-bootstrap/Spinner'
//import ReactTooltip from "react-tooltip";

const Footer = () => {
    
        return (

            <footer className='footer mt-auto py-3 bg-dark text-white'>
              <div className='footer-content'> AMF Dev {new Date().getFullYear()}</div>
            </footer>
        );
    }

export default Footer;
