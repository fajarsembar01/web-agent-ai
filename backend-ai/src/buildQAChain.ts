// src/buildQAChain.ts
import fs from "fs/promises";
import path from "path";
import { Document } from "@langchain/core/documents";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { agentPrompt } from "./prompts/agentPrompt.js"; // atau ragPrompt kamu

export async function buildQAChain() {
  const filePath = path.resolve("..", "KB", "kecerdasan.md"); // ← pastikan path ini benar
  const content = await fs.readFile(filePath, "utf-8");

  const doc = new Document({
    pageContent: content,
    metadata: { source: "kecerdasan.md" },
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  const splitDocs = await splitter.splitDocuments([doc]);

  const embeddings = new OpenAIEmbeddings();
  const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
  const retriever = vectorstore.asRetriever({ k: 3 });

  const llm = new ChatOpenAI({
    temperature: 0.3,
    modelName: "gpt-4o",
  });

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: agentPrompt, // pastikan ini ChatPromptTemplate with {input}
  });

  return createRetrievalChain({
    retriever,
    combineDocsChain,
  });
}
