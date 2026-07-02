import { Button, Card, Badge, Accordion, useAccordionButton } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { deleteNoteAction, listNoteAction } from "../../actions/notes-actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import './MyNotes.css';

export default function MyNotes({ search }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notesList = useSelector(state => state.notesList);
    const userLogin = useSelector(state => state.userLogin);

    const noteCreate = useSelector(state => state.noteCreate);
    const noteUpdate = useSelector(state => state.noteUpdate);
    const noteDelete = useSelector(state => state.noteDelete);

    const { success: updateSuccess } = noteUpdate;
    const { success: createSuccess } = noteCreate;
    const { success: deleteSuccess, loading: deleteLoading, error: deleteError } = noteDelete;

    const { loading, error, notes } = notesList;
    const { userInfo } = userLogin;

    function deleteHandler(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteNoteAction(id));
        }
    }

    function CustomToggle({ children, eventKey }) {
        const toggle = useAccordionButton(eventKey);

        return (
            <span className="headerTitle" onClick={toggle}>
                {children}
            </span>
        )
    }

    useEffect(() => {
        dispatch(listNoteAction());

        if (!userInfo) {
            navigate('/login');
        }

    }, [dispatch, createSuccess, userInfo, updateSuccess, deleteSuccess]);

    if (loading || deleteLoading) {
        return <Loading />
    }

    return (
        <MainScreen title={`Welcome Back ${userInfo.user.name}..`}>
            <Button as={Link} to="/createnote" style={{ marginLeft: 10, marginBottom: 6 }} size="lg">Create New Note</Button>

            {/* {loading && <Loading />} */}
            {error && <Error variant="danger">{error}</Error>}
            {deleteError && <Error variant="danger">{deleteError}</Error>}
            {notes && notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.category.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase())).map(note => (
                <Accordion defaultActiveKey="0" key={note._id}>
                    <Card className="m-2">
                        <Card.Header className="d-flex">
                            <CustomToggle eventKey="0">{note.title}</CustomToggle>
                            <div>
                                <Button variant="primary" as={Link} to={`/note/${note._id}`}>Edit</Button>
                                <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>Delete</Button>
                            </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <h4>
                                    <Badge bg="success">Category - {note.category}</Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <ReactMarkdown>{note.content}</ReactMarkdown>
                                    <footer className="blockquote-footer">
                                        Created On <cite title="Source Title">{new Date(note.createdAt).toDateString()}</cite>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ))}
        </MainScreen>
    );
}