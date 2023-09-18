import express from "express";
import db from "../db/conn.mjs";
import multer from "multer";
import { ObjectId } from "mongodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucket_name = process.env.BUCKET_NAME
const bucket_reg = process.env.BUCKET_REG
const bucket_key = process.env.BUCKET_KEY
const bucket_secret_key = process.env.BUCKET_SECRET_KEY

const S3 = new S3Client({
  credentials: {
    accessKeyId: bucket_key,
    secretAccessKey: bucket_secret_key
  },
  region: bucket_reg
});


function generateRandomKey(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}

router.get("/", async (req, res) => {
  let collection = await db.collection("content");

  const query = req.query;

  let results = await collection.find(query).toArray();
  res.send(results).status(200);
})

router.post("/", upload.single('image'), async (req, res) => {
  const key = generateRandomKey(20)
  const params = {
    Bucket: bucket_name,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  }

  const command = new PutObjectCommand(params)
  let newDocument = {
    name: req.body.name,
    amount: req.body.amount,
    type: req.body.type,
    user: req.user[0].username,
    profile: `https://easy-split.s3.ca-central-1.amazonaws.com/${key}`
  };
  let collection = await db.collection("content");
  let result = await collection.insertOne(newDocument);
  console.log(req.body);

  await S3.send(command)

  res.send(newDocument);

});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("content");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;