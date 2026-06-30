import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { login } from "../../actions/user-actions";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [userInfo]);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <MainScreen title="LOGIN">
            {loading && <Loading />}
            {error && <Error variant="danger">{error}</Error>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer ? <Button variant="link" as={Link} to="/signup">Register Here</Button>
                </Col>
            </Row>
        </MainScreen>
    )
}