import React from "react";
import {Outlet, Link} from "react-router-dom";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import './AppLayout.scss'
const AppLayout = () => {
  return (
    <div>
      <Navbar expand="lg" fixed="top" >
        <Container>
          <Navbar.Brand href="/">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" >
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              
              <Nav.Link as={Link} to="/movie">Movies</Nav.Link>
              <Nav.Link as={Link} to="/tv">TV Shows</Nav.Link>
              {/* <Nav.Link as={Link} to="/genre">Genres</Nav.Link> */}
              <Nav.Link as={Link} to="/mypage">My List</Nav.Link>
              
            </Nav>
            <Form className="d-flex">
            <Form.Control type="search" placeholder="Search..." className="me-2" aria-label="Search" />
            <Button><IoSearch /></Button>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Form>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
      <main>
        <Outlet></Outlet>
        
      </main>
      <footer>
      <Container>
        <ul>
          <li>
            <button>데이터 출처</button>
            <button>서비스 이용약관</button>
            <button>개인정보 처리방침</button>
            <button>회사 안내</button>
          </li>
          <li>
            <button>고객센터</button>
            <button>이메일</button>
          </li>
          <li className="copy">
            &copy; 2025 by LOOP.
          </li>
        </ul>
      </Container>
      </footer>
    </div>
  );
};

export default AppLayout;
