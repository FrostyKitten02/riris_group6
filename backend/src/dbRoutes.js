const express = require("express");
const { addDocument, addDocumentsList, getAllDocuments, deleteDocument, deleteDocumentById, updateDocument, destroy } = require("../src/pouchdb");
const router = express.Router();

// Route to add a document
router.post("/add", async (req, res) => {
  try {
    const response = await addDocument(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a document
router.post("/addList", async (req, res) => {
  try {
    const response = await addDocumentsList(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all documents
router.get("/all", async (req, res) => {
  try {
    const response = await getAllDocuments();
    res.json(response.rows.map(row => row.doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete document
router.delete("/delete/:id/:rev", async (req, res) => {
  const { id, rev } = req.params;

  try {
    const response = await deleteDocument(id, rev);
    res.json({ message: "Document deleted successfully", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a document by only `_id`
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteDocumentById(id);
    res.json({ message: "Document deleted successfully", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a document by `_id`
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body; // Get the new data from request body

  try {
    const response = await updateDocument(id, newData);
    res.json({ message: "Document updated successfully", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/wipe", async (req, res) => {
  try {
    await destroy();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

module.exports = router;
