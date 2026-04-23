const express = require("express");
const Grievance = require("../models/Grievance");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect only grievance routes
router.use("/grievances", authMiddleware);

// POST /api/grievances -> Submit grievance
router.post("/grievances", async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: "Title, description and category are required" });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      status: status || "Pending",
      student: req.user.id,
    });

    return res.status(201).json({ message: "Grievance submitted", grievance });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/grievances -> View all grievances of logged-in student
router.get("/grievances", async (req, res) => {
  try {
    const grievances = await Grievance.find({ student: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(grievances);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/grievances/search?title=xyz -> Search grievance
router.get("/grievances/search", async (req, res) => {
  try {
    const { title = "" } = req.query;

    const grievances = await Grievance.find({
      student: req.user.id,
      title: { $regex: title, $options: "i" },
    }).sort({ createdAt: -1 });

    return res.status(200).json(grievances);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/grievances/:id -> View grievance by ID
router.get("/grievances/:id", async (req, res) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      student: req.user.id,
    });

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    return res.status(200).json(grievance);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/grievances/:id -> Update grievance
router.put("/grievances/:id", async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const grievance = await Grievance.findOneAndUpdate(
      { _id: req.params.id, student: req.user.id },
      {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(status !== undefined && { status }),
      },
      { new: true, runValidators: true }
    );

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    return res.status(200).json({ message: "Grievance updated", grievance });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/grievances/:id -> Delete grievance
router.delete("/grievances/:id", async (req, res) => {
  try {
    const grievance = await Grievance.findOneAndDelete({
      _id: req.params.id,
      student: req.user.id,
    });

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    return res.status(200).json({ message: "Grievance deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
