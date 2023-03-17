// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Content from "../models/content";

// Global Config

export const contentRouter = express.Router();

contentRouter.use(express.json());


// GET Content
contentRouter.get("/", async (_req: Request, res: Response) => {
    console.log('attempting get')
    try {
       const Contents = (await collections.content?.find({}).toArray()) as unknown as Content[];

        res.status(200).send(Contents);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);        }
    }
});

contentRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const Content = (await collections.content?.findOne(query)) as unknown as Content;

        if (Content) {
            res.status(200).send(Content);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
contentRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newContent = req.body as Content;
        const result = await collections.content?.insertOne(newContent);

        result
            ? res.status(201).send(`Successfully created a new Content with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Content.");
    } catch (error) {
        console.error(error);
        res.status(400).send((error as Error).message);
    }
});


// PUT
contentRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedContent: Content = req.body as Content;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.content?.updateOne(query, { $set: updatedContent });

        result
            ? res.status(200).send(`Successfully updated Content with id ${id}`)
            : res.status(304).send(`Content with id: ${id} not updated`);
    } catch (error) {
        console.error((error as Error).message);
        res.status(400).send((error as Error).message);
    }
});

// DELETE
contentRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections?.content?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed Content with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove Content with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Content with id ${id} does not exist`);
        }
    } catch (error) {
        console.error((error as Error).message);
        res.status(400).send((error as Error).message);
    }


});
module.exports = contentRouter ;