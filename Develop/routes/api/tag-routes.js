const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, though: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async ({ body }, res) => {
  try {
    const newTag = await Tag.create(body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async ({ body, params }, res) => {
  try {
    const updatedTag = await Tag.update(body, {
      where: {
        id: params.id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
