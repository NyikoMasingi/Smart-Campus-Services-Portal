import { Router } from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  assignTicket,
  deleteTicket
} from '../controllers/ticket.controller';

import upload, { uploadToS3 } from '../middleware/upload.middleware';

const router = Router();

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id/status', updateTicketStatus);
router.put('/:id/assign', assignTicket);
router.delete('/:id', deleteTicket);
router.post('/', upload, uploadToS3, createTicket);


export default router;
