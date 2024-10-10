import express from 'express';
import {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
} from '../controllers/requestController';

const router = express.Router();

// Get all request
router.get('/',getAllRequests);

// Get a single request by ID
router.get('/:id',getRequestById as any)

// Post a request
router.post('/',createRequest);

// Update a request by id
router.put('/:id',updateRequest as any);
// Delete a request by id
router.delete('/:id',deleteRequest as any)

export default router;