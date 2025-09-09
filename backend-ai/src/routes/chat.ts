// src/routes/chat.ts
import express from "express";
import { buildQAChain } from "../buildQAChain.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;

  try {
    const chain = await buildQAChain();

    const response = await chain.invoke({
      input: question, // ✅ gunakan invoke, bukan call
    });

    res.json({
      answer: response.answer, // ✅ ambil dari response.answer
    });
  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
