export default async function updateComment(req, res, db, Comment) {
    try {
        const { comment_id } = req.params;
        const { content } = req.body;
        const userId = req.session.userId;

        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "Content is required" });
        }

        const commentModel = new Comment(db);
        const comment = await commentModel.find_by_id(comment_id);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.author_id !== userId) {
            return res.status(403).json({ error: "Forbidden: you are not the author of this post" });
        }

        const updatedComment = await commentModel.update(comment_id, content);

        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}