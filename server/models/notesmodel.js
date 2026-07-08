import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
}, {
    timestamps: true
});

NoteSchema.index({ user: 1, category: 1 });
NoteSchema.index({ user: 1, createdAt: -1 });

const Note = mongoose.model('notes', NoteSchema);
export default Note;