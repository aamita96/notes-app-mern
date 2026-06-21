import { Spinner } from "react-bootstrap";

export default function Loading({ size = 100 }) {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" style={{ width: size, height: size }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}