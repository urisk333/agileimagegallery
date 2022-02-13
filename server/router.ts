import express from "express";
import controller from "./controllers/controller";

const router = express.Router();

// Post for a manually populating the database with the user data by using Postman
router.post("/users", controller.addUser);

router.get("/users", controller.getUsers);
router.post("/images", controller.addImage);
router.get("/images", controller.getImages);
router.get("/images/:id", controller.getOneImage);
router.post("/comments", controller.addComment);
router.get("/comments", controller.getComments);
router.put("/comments/:id", controller.updateComment);
router.delete("/comments/:id", controller.deleteComment);

export default router;
