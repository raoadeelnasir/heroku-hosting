import express from "express";
import Private from "../model/privateModel.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const data = await Private.findOne({permission: 1});
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send(error);
  }
});
router.post('/',(request,response)=>{
  try {
    const data = new Private({});
    data.save();
    response.status(201).send(data)
  } catch (error) {
    response.status(400).send(error);
  }
})

export default router;
