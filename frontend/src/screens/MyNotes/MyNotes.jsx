import { Button, Card, Badge, Accordion, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import './MyNotes.css';
import MainScreen from "../../components/MainScreen/MainScreen";

export default function MyNotes() {
    let notes = [
        {
            _id: "1",
            title: "Day 1 of college",
            content:
                "I made a few new friends and introduced myself to a lot of new teachers.",
            category: "College",
        },
        {
            _id: "2",
            title: "Learned some Node JS",
            content: "Learned how to create a server in node JS and my first API",
            category: "Learning",
        },
        {
            _id: "3",
            title: "Watched some Anime",
            content: "Finished 2 seasons of Attack on Titan and My Hero academia.",
            category: "Entertainment",
        },
        {
            _id: 4,
            title: "Started React JS",
            content:
                "Made my first App in React JS, feels awesome to learn something new. I aim to be a full stack dev someday",
            category: "Learning",
        },
    ];

    function deleteHandler(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            notes = notes.filter(note => Number(note._id) !== Number(id));
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