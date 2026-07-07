import { Alert } from "react-bootstrap";

export default function Error({ variant = "info", children }) {
    const renderErrors = () => {
        // If children is a simple string
        if (typeof children === 'string') {
            return <strong>{children}</strong>
        }

        if (children?.errors) {
            return (
                <>
                    <Alert.Heading>{children.message}</Alert.Heading>
                    <ul>
                        {Object.values(children.errors)
                            .flat()
                            .map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                    </ul>
                </>
            )
        }

        // Generic API error
        if (children?.message) {
            return <strong>{children.message}</strong>;
        }

        return <strong>Something went wrong</strong>;
    };

    return (
        <Alert variant={variant}>
            {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
            {renderErrors()}
        </Alert>
    )
}