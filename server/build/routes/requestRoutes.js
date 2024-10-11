"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestController_1 = require("../controllers/requestController");
const router = express_1.default.Router();
// Get all request
router.get('/', requestController_1.getAllRequests);
// Get a single request by ID
router.get('/:id', requestController_1.getRequestById);
// Post a request
router.post('/', requestController_1.createRequest);
// Update a request by id
router.put('/:id', requestController_1.updateRequest);
// Delete a request by id
router.delete('/:id', requestController_1.deleteRequest);
router.get('/search', requestController_1.searchRequests);
exports.default = router;
