import { Request, Response } from 'express';
import { ObjectId } from "mongodb";
import { collections} from '../config/db_config';
import Resource from '../models/resource.model';





export const createResource = async (req: Request, res: Response) =>  {
    const { name, type, status, location } = req.body;
    const newResource = new Resource(name, type, status, location);
    
    try {
        const result = await collections.resources?.insertOne(newResource);
        if (result) {
            res.status(201).send(result);
        } else {
            res.status(500).send('Failed to create resource');
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating resource:', error.message);
            res.status(500).send('Failed to create resource');
        }
    }
 }
export const getResourceById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const resource: Resource | null = await collections.resources?.findOne(query) as Resource;
        if (resource === null) {
            res.status(404).send(`Unable to find matching document with id: ${req?.params?.id}`);
        } else {
            res.status(200).send(resource);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error retrieving resource:', error.message);
            res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
        }
    }
}
export const updateResource = async (req: Request, res: Response) => { 
    const id = req.params.id;
    const updatedResource = req.body as Resource;
    try {
        const query = { _id: new ObjectId(id) };
        const resource: Resource | null = await collections.resources?.findOne(query) as Resource;
        if (resource === null) {
            res.status(404).send(`Unable to find matching document with id: ${req?.params?.id}`);
        } else {
            const updateResult = await collections.resources?.updateOne(query, { $set: updatedResource });
            if (updateResult && updateResult.modifiedCount) {
                res.status(200).send(resource);
            } else {
                res.status(304).send(`Failed to update resource with id ${id}`);
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating resource:', error.message);
            res.status(500).send('Failed to update resource');
        }
    }
 }
export const deleteResource = async (req: Request, res: Response) => { 
    const id = req.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.resources?.findOne(query);
        if (result) {
            const deleteResult = await collections.resources?.deleteOne(query);
            if (deleteResult && deleteResult.deletedCount) {
                res.status(200).send(`Successfully deleted resource with id ${id}`);
            } else {
                res.status(304).send(`Failed to delete resource with id ${id}`);
            }
        } else if (!result) {
            res.status(400).send(`Failed to remove resource with id ${id}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
}
export const getAllResources = async (req: Request, res: Response) => {
    try {
        const resources: Resource[] = (await collections.resources?.find({}).toArray()) as Resource[];
        res.status(200).send(resources);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error retrieving resources:', error.message);
            res.status(500).send('Failed to retrieve resources');
        }
    }
}
export const getResourcesBYType = async (req: Request, res: Response) =>{
    const type = req.params.type;
    try {
        const query = { type: type };
        const resources: Resource[] = (await collections.resources?.find(query).toArray()) as Resource[];
        if (resources.length === 0) {
            res.status(404).send(`Unable to find matching documents with type: ${req?.params?.type}`);
        } else {
            res.status(200).send(resources);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error retrieving resources:', error.message);
            res.status(500).send('Failed to retrieve resources');
        }
    }
 }