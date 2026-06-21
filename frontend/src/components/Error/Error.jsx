import { Alert } from "react-bootstrap";

export default function Error({ variant = "info", children }) {
    return (
        <Alert variant={variant}>
            {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
            <strong>{children}</strong>
        </Alert>
    )
}