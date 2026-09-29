import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import e from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";

const app = e();
const port = 3200;

app.use(e.json());
app.use(cors());


// ===============================
// ADD TASK
// ===============================
app.post("/add-task", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const { title, description = "", priority = "medium" } = req.body;

    if (!title || !title.trim()) {
      return resp.status(400).send({
        success: false,
        message: "Task title is required"
      });
    }

    const task = {
      title: title.trim(),
      description,
      priority: priority.toLowerCase(),
      completed: false,
      createdAt: new Date()
    };

    const result = await collection.insertOne(task);

    resp.send({
      message: "New task added",
      success: true,
      result
    });

  } catch (error) {
    console.error(error);

    resp.status(500).send({
      success: false,
      message: "Failed to add task"
    });
  }
});


// ===============================
// GET ALL TASKS
// HIGH → MEDIUM → LOW
// ===============================
app.get("/tasks", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection
      .find()
      .sort({
        completed: 1,
        priority: 1
      })
      .toArray();

    // Convert priority into our desired order
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3
    };

    result.sort((a, b) => {

      // Pending tasks first
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }

      // Then priority
      return (
        (priorityOrder[a.priority] || 2) -
        (priorityOrder[b.priority] || 2)
      );
    });

    resp.send({
      message: "Task list fetched",
      success: true,
      result
    });

  } catch (error) {
    console.error(error);

    resp.status(500).send({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
});


// ===============================
// GET SINGLE TASK
// ===============================
app.get("/task/:id", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid task ID"
      });
    }

    const result = await collection.findOne({
      _id: new ObjectId(id)
    });

    if (!result) {
      return resp.status(404).send({
        success: false,
        message: "Task not found"
      });
    }

    resp.send({
      message: "Task fetched",
      success: true,
      result
    });

  } catch (error) {
    console.error(error);

    resp.status(500).send({
      success: false,
      message: "Failed to fetch task"
    });
  }
});


// ===============================
// UPDATE TASK
// ===============================
app.put("/update-task", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const { _id, ...fields } = req.body;

    if (!_id) {
      return resp.status(400).send({
        success: false,
        message: "Task ID is required"
      });
    }

    if (!ObjectId.isValid(_id)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid task ID"
      });
    }

    // Validate title only if title is being updated
    if (
      fields.title !== undefined &&
      (!fields.title || !fields.title.trim())
    ) {
      return resp.status(400).send({
        success: false,
        message: "Task title is required"
      });
    }

    // Validate priority
    if (fields.priority) {
      const allowedPriorities = ["high", "medium", "low"];

      if (!allowedPriorities.includes(fields.priority.toLowerCase())) {
        return resp.status(400).send({
          success: false,
          message: "Priority must be high, medium or low"
        });
      }

      fields.priority = fields.priority.toLowerCase();
    }

    const result = await collection.updateOne(
      {
        _id: new ObjectId(_id)
      },
      {
        $set: fields
      }
    );

    if (result.matchedCount === 0) {
      return resp.status(404).send({
        success: false,
        message: "Task not found"
      });
    }

    resp.status(200).send({
      success: true,
      message: "Task updated successfully",
      result
    });

  } catch (error) {
    console.error("Update task error:", error);

    resp.status(500).send({
      success: false,
      message: "Failed to update task",
      error: error.message
    });
  }
});


// ===============================
// MARK TASK DONE / PENDING
// ===============================
app.put("/toggle-task/:id", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid task ID"
      });
    }

    const task = await collection.findOne({
      _id: new ObjectId(id)
    });

    if (!task) {
      return resp.status(404).send({
        success: false,
        message: "Task not found"
      });
    }

    const newStatus = !task.completed;

    const result = await collection.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          completed: newStatus
        }
      }
    );

    resp.send({
      success: true,
      message: newStatus
        ? "Task marked as done"
        : "Task marked as pending",
      completed: newStatus,
      result
    });

  } catch (error) {
    console.error("Toggle task error:", error);

    resp.status(500).send({
      success: false,
      message: "Failed to update task status"
    });
  }
});


// ===============================
// DELETE TASK
// ===============================
app.delete("/delete/:id", async (req, resp) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid task ID"
      });
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return resp.status(404).send({
        success: false,
        message: "Task not found"
      });
    }

    resp.send({
      message: "Task deleted",
      success: true,
      result
    });

  } catch (error) {
    console.error(error);

    resp.status(500).send({
      success: false,
      message: "Failed to delete task"
    });
  }
});


// ===============================
// START SERVER
// ===============================
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});