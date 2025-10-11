export async function deletePostFav(req, res, db, Fav){
    const moduleFav = new Fav(db);
    const { post_id } = req.params;
    try {
        const id = req.session?.userId; 

         await moduleFav.del_fav(post_id);
        
        res.json({ message: "Post remuved from favorites" });
    }
    catch (err) { 
        console.error(err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
}