import MainScreen from "../../components/MainScreen/MainScreen";
import { useNavigate, useParams } from "react-router-dom";
import { updateNoteAction } from "../../actions/notes-actions";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

export default function SingleNote() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const userLogin = useSelector(state => state.userLogin);
    const noteUpdate = useSelector(state => state.noteUpdate);

    const { userInfo } = userLogin;
    const { loading, error } = noteUpdate;

    useEffect(() => {

        const fetching = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            const { data } = await axios.get(`/api/notes/${id}`, config);

            setTitle(data.title);
            setCategory(data.category);
            setContent(data.content);
            setDate(data.updatedAt);
        }

        fetching();
    }, [id, date]);

    function submitHandler(e) {
        e.preventDefault();
        if (!title || !category || !content) return;

        dispatch(updateNoteAction(id, title, category, content));

        resetHandler();
        navigate('/mynotes');
    }

    function resetHandler() {
        setTitle("");
        setCategory("");
        setContent("");
    }

    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <Error variant="danger">{error}</Error>}
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Give your idea a name" onChange={(e) => setTitle(e.target.value)} value={title} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select placeholder="Choose a category" onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option value="" disabled>Choose note category</option>
                                <option value="fitness">Fitness</option>
                                <option value="finance">Finance</option>
                                <option value="focus">Focus</option>
                                <option value="upskill">Up-Skill</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => setContent(e.target.value)} value={content}
                                rows="5" placeholder="Capture your inspiration before it slips away..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {content && (
                                <Card>
                                    <Card.Header>Note Preview</Card.Header>
                                    <Card.Body>
                                        <ReactMarkdown>{content}</ReactMarkdown>
                                    </Card.Body>
                                </Card>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex gap-3">
                            <Button variant="primary" type="submit" disabled={loading}>
                                Update Note {loading && <Loading size={20} />}
                            </Button>
                            <Button variant="danger" type="reset" onClick={resetHandler}>
                                Reset Fields
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Updated On <cite title="Source Title">{new Date(date).toDateString()}</cite>
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}