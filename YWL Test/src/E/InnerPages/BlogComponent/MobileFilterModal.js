

import React from 'react'
import Container from 'react-bootstrap/Container';
import './index.scss'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"
import { TiFilter } from 'react-icons/ti';

function FilterModal() {

  // Modal open state
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div className='blogParent'>
    <div style={{
      display: 'block'
    }}>
      <>
        <div>		<TiFilter color="danger"
          onClick={toggle}></TiFilter></div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader
            toggle={toggle}>FILTER</ModalHeader>
          <ModalBody>
            <div class="main">
              <input icon='search'
                className="search-btn w-100"
                placeholder='Search...'
              // onChange={(e) => searchItems(e.target.value)}
              />
            </div>
          
            <Navbar expand="lg " className="px-0 my-2">
              <Container className="bg-hamburger">
                <div className=''><Navbar.Brand className='text-white bg-hamburger px-2 ls-1'>Archieve</Navbar.Brand></div>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav text-white" />
                <Navbar.Collapse id="basic-navbar-nav text-white">
                <ul className='list-unstyled text-white p-3'>
                  <li>dynamic data</li>
                  </ul>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <Navbar expand="lg " className="px-0">
              <Container className="bg-hamburger">
                <div className=''><Navbar.Brand className='text-white bg-hamburger ls-1 px-2'>Categories</Navbar.Brand></div>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav text-white" />
                <Navbar.Collapse id="basic-navbar-nav text-white">
                  <ul className='list-unstyled text-white p-3'>
                    <li>dynamuc data</li>
                  </ul>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </ModalBody>
          <ModalFooter>
            <div className="mx-auto">
              <Button color="danger" onClick={toggle}>CLOSE</Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    </div>
    </div>
  );
}

export default FilterModal;
