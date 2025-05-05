import express, { Router } from 'express';
const resourceRouter: Router = express.Router();
resourceRouter.use(express.json()); 

import { createResource, getResourceById, updateResource, deleteResource, getAllResources, getResourcesBYType } from '../controllers/resource.controller';


/**
 * @route   POST /api/resource/create
 * @desc    Create a new resource
 * @access  adimin (self)
 * @body    { name: string, type: ResourceType, status: ResourceStatus, location: string }
 * @example { name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' }
 * @returns { resource_id: ObjectId, name: string, type: ResourceType, status: ResourceStatus, location: string }   
 */
resourceRouter.post('/create', createResource);

/**
 * @route   GET /api/resource/:id
 * @desc    Get a resource by id
 * @access  all (self)
 * @params  { id: ObjectId }
 * @example { id: '60d5f484f1c2b8b8a4e4e4e4' }
 * @returns { resource_id: ObjectId, name: string, type: ResourceType, status: ResourceStatus, location: string }
 * @example { resource_id: '60d5f484f1c2b8b8a4e4e4e4', name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' }

 */
resourceRouter.get('/:id', getResourceById);

/**
 * @route   GET /api/resource/:id/update
 * @desc    Get resource details to be updated
 * @access  all (self)
 * @params  { id: ObjectId }
 * @example { id: '60d5f484f1c2b8b8a4e4e4e4' }
 * @returns { resource_id: ObjectId, name: string, type: ResourceType, status: ResourceStatus, location: string }
 * @example { resource_id: '60d5f484f1c2b8b8a4e4e4e4', name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' }
 */
resourceRouter.get('/:id/update', getResourceById);

/**
 * @route  GET /api/resource/:type
 * @desc   Get all resources of a specific type
 * @access all (self)
 * @params { type: ResourceType }
 * @example { type: 'room' }
 * @returns { resources: Array<{ resource_id: ObjectId, name: string, type: ResourceType, status: ResourceStatus, location: string }> }
 * @example { resources: [ { resource_id: '60d5f484f1c2b8b8a4e4e4e4', name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' } ] }
 * 
 */
resourceRouter.get('/:type', getResourcesBYType);



/**
 * @route   PATCH /api/resource/update/:id
 * @desc    Update a resource
 * @access  all (self)
 * @params  { id: ObjectId }
 * @example { id: '60d5f484f1c2b8b8a4e4e4e4' }
 * @body    { name: string, type: ResourceType, status: ResourceStatus, location: string }
 * @example { name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' }
 * @returns { resource_id: ObjectId, name: string, type: ResourceType, status: ResourceStatus, location: string }
 *  @example { resource_id: '60d5f484f1c2b8b8a4e4e4e4', name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' }
 */
resourceRouter.patch('/update/:id', updateResource);

/**
 * @route   DELETE /api/resource/delete/:id
 * @desc    Delete a resource
 * @access  all (self)
 * @params  { id: ObjectId }
 * @example { id: '60d5f484f1c2b8b8a4e4e4e4' }
 * @returns { message: string }
 * @example { message: 'Successfully deleted resource with id 60d5f484f1c2b8b8a4e4e4e4' }
 */
resourceRouter.delete('/delete/:id', deleteResource);

/**
 * @route   GET /api/resource
 * @desc    Get all resources
 * @access  all (self)
 * @returns { resources: Array<{ resource_id: ObjectId, name: string, type: ResourceType, status: ResourceStatus, location: string }> }
 * @example { resources: [ { resource_id: '60d5f484f1c2b8b8a4e4e4e4', name: 'Conference Room', type: 'room', status: 'available', location: 'Building A' } ] }      
 * 
 */
resourceRouter.get('/', getAllResources);

