export const validate = (schema, source = "body") => (req, res, next) => {
    // Used safeParse() instead of parse(), parse() throws an exception immediately.
    const result = schema.safeParse(req[source]);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten().fieldErrors
        });
    }

    req[source] = result.data; // validated and typed data
    next();
}