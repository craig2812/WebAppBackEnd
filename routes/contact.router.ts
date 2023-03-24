// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId, Filter } from "mongodb";
import { collections } from "../services/database.service";
import Contact from "../models/contact";

// Global Config

export const contactRouter = express.Router();

contactRouter.use(express.json());


// GET Contact
contactRouter.get("/", async (_req: Request, res: Response) => {
    console.log('attempting to get contacts')
    try {
       const Contacts = (await collections.contact?.find({}).toArray()) as unknown as Contact[];
console.log(Contacts)
        res.status(200).send(Contacts);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);        }
    }
});

contactRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const Contact = (await collections.contact?.findOne(query)) as unknown as Contact;

        if (Contact) {
            res.status(200).send(Contact);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// GET BY NAME 
//Gets a contact info from dtatabase using name as search field 
contactRouter.get("/name/:name", async (req: Request, res: Response) => {
    const name = req?.params?.name;

    try {
    const Contact = (await collections.contact?.findOne({name: name}));
        if (Contact) {
            res.status(200).send(Contact);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with name: ${req.params.name}`);
    }
});

// POST
contactRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newContact = req.body as Contact;
        const result = await collections.contact?.insertOne(newContact);

        result
            ? res.status(201).send(`Successfully created a new Contact with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Contact.");
    } catch (error) {
        console.error(error);
        res.status(400).send((error as Error).message);
    }
});


// PUT
contactRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedContact: Contact = req.body as Contact;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.contact?.updateOne(query, { $set: updatedContact });

        result
            ? res.status(200).send(`Successfully updated Contact with id ${id}`)
            : res.status(304).send(`Contact with id: ${id} not updated`);
    } catch (error) {
        console.error((error as Error).message);
        res.status(400).send((error as Error).message);
    }
});

// DELETE
contactRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections?.contact?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed Contact with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove Contact with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Contact with id ${id} does not exist`);
        }
    } catch (error) {
        console.error((error as Error).message);
        res.status(400).send((error as Error).message);
    }


});
module.exports = contactRouter ;