// userController
const { getAllSneakers, createShoe } = require("../model/sneakerModel");
const { object, string, number, date, InferType } = require("yup");

let createSneakerSchema = object({
  merkki: string().required(),
  malli: string().required(),
  hinta: number().required(),
  koko: number().required(),
  user: string().required(),
  //kuva: string().required(),
});

const get_all_sneakers = async (req, res) => {
  const sneakers = await getAllSneakers();
  return res.json(sneakers);
};

const add_shoe = async (req, res) => {
  let sneakers;
  try {
    const body = await createSneakerSchema.validate(req.body);
    console.log(body);
    //body.user = req.user.ID;
    sneakers = await createShoe(body);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  return res.redirect("../app/community/index.html");
};

module.exports = {
  get_all_sneakers,
  add_shoe,
};
