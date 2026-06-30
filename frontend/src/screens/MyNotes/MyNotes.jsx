import { Button, Card, Badge, Accordion, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import './MyNotes.css';
import MainScreen from "../../components/MainScreen/MainScreen";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyNotes() {
    const [notes, setNotes] = useState([]);

    function deleteHandler(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            // notes = notes.filter(note => Number(note._id) !== Number(id));
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

    const fetchNotes = async () => {
        const {data} = await axios.get("/api/notes");
        setNotes(data);
    }
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <MainScreen title="Welcome Back Amit Khatri..">
            <Button as={Link} to="/createnote" style={{ marginLeft: 10, marginBottom: 6 }} size="lg">Create New Note</Button>

            {notes.map(note => (
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
                                    <p>
                                        {note.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Created On <cite title="Source Title">{new Date().toDateString()}</cite>
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