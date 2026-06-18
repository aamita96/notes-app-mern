import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './LandingPage.css';
import Button from "react-bootstrap/Button";

export default function LandingPage() {
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
                            <a href="/login">
                                <Button size="lg" className="landingButton">Login</Button>
                            </a>
                            <a href="/signup">
                                <Button size="lg" variant="outline-primary" className="landingButton">SignUp</Button>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}