import { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/user-actions";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState("https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.svg");
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage("Password and confirm password doesn't match!");
        } else {
            dispatch(register(name, email, password, profilePic));
        }
    };

    const uploadImage = (pics) => {
        // setMessage(false);

        console.log(pics);
        if (pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/jpeg") {
            const data = new FormData();
            data.append("file", pics);
            console.log('formData' + data);
        } else {
            // setMessage("Please select an Image");
        }
    }

    return (
        <MainScreen title="Register">
            {loading && <Loading />}
            {error && <Error variant="danger">{error}</Error>}
            {message && <Error variant="danger">{message}</Error>}

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
        </MainScreen>
    )
}