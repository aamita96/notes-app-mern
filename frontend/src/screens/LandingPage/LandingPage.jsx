import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './LandingPage.css';
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");

    //     if (userInfo) navigate('/mynotes');
    // }, [])

    return (
        <div className="main">
            <Container>
                <Row>
                    <Col>
                        <div className="intro-text">
                            <h1 className="title">Welcome to Notes App</h1>
                            <p className="subtitle">One safe place for all your notes.</p>
                        </div>
                        <div className="buttonContainer">
                            <Button size="lg" className="landingButton" as={Link} to="/login">Login</Button>
                            <Button size="lg" variant="outline-primary" className="landingButton" as={Link} to="/signup">SignUp</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}