import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import MainScreen from "../../components/MainScreen/MainScreen";
import { updateProfile } from "../../actions/user-actions";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState("https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.svg");
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const userUpdate = useSelector(state => state.userUpdate);

    const { loading: loadingUserInfo, error: errorLoadingUserInfo, userInfo } = userLogin;
    const { loading, error: updateError, userInfo: updatedInfo, success: updateSuccess } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            return navigate('/');
        } else {
            setName(userInfo.user.name);
            setEmail(userInfo.user.email);
            setProfilePic(userInfo.user.pic);
        }

    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);

        if ((password == "" || password == null) || password !== confirmPassword) {
            setMessage("Password and confirm password doesn't match!");
        } else {
            dispatch(updateProfile({
                name,
                email,
                password,
                confirmPassword,
                pic: profilePic,
            }));
        }
    };

    if (loading || !userInfo) {
        return <Loading />;
    }

    return (
        <MainScreen title="Edit Profile">
            {errorLoadingUserInfo && <Error variant="danger">{errorLoadingUserInfo}</Error>}
            {updateError && <Error variant="danger">{updateError}</Error>}
            
            {updateSuccess && <Error variant="success">Updated Successfully!</Error>}
            {message && <Error variant="danger">{message}</Error>}

            <Row>
                <Col md="6">
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formBasicProfile">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg,.jpeg" placeholder="Upload Profile Picture" onChange={(e) => uploadImage(e.target.files[0])} />
                </Form.Group> */}

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md="6">
                    <div className="d-flex justify-content-center ">
                        <Card className="w-50">
                            <Card.Img variant="top" src={profilePic}></Card.Img>
                        </Card>
                    </div>
                </Col>
            </Row>

        </MainScreen>
    )
}