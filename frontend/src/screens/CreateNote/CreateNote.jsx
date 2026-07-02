import MainScreen from "../../components/MainScreen/MainScreen";
import { createNoteAction } from "../../actions/notes-actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const noteCreate = useSelector(state => state.noteCreate);
    const { loading, error, note } = noteCreate;

    function submitHandler(e) {
        e.preventDefault();
        if (!title || !category || !content) return;

        dispatch(createNoteAction(title, category, content));

        resetHandler();
        navigate('/mynotes');
    }

    function resetHandler() {
        setTitle("");
        setCategory("");
        setContent("");
    }

    return (
        <MainScreen title="Create a Note">
            <Card>
                <Card.Header>Create a Note</Card.Header>
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
                            <Button variant="primary" type="submit">
                                Create a Note
                            </Button>
                            <Button variant="danger" type="reset" onClick={resetHandler}>
                                Reset Fields
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Created On <cite title="Source Title">{new Date().toDateString()}</cite>
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}