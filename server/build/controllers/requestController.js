"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRequests = exports.deleteRequest = exports.updateRequest = exports.createRequest = exports.getRequestById = exports.getAllRequests = void 0;
const Request_1 = __importDefault(require("../models/Request"));
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield Request_1.default.find();
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
});
exports.getAllRequests = getAllRequests;
const getRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield Request_1.default.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching request', error });
    }
});
exports.getRequestById = getRequestById;
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { floor, roomUnit, block, requestedBy, phoneNumber, location, service, department } = req.body;
        const newRequest = new Request_1.default({
            floor,
            roomUnit,
            block,
            requestedBy,
            phoneNumber,
            location,
            service,
            department,
            status: 'NEW',
            priority: 'MEDIUM',
            assignedTo: 'Mohamed'
        });
        const savedRequest = yield newRequest.save();
        res.status(201).json(savedRequest);
    }
    catch (error) {
        console.error('Error creating request:', error);
        res.status(400).json({
            message: 'Error creating request',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
});
exports.createRequest = createRequest;
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRequest = yield Request_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(updatedRequest);
    }
    catch (error) {
        console.error('Error updating request:', error);
        res.status(400).json({
            message: 'Error updating request',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
});
exports.updateRequest = updateRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRequest = yield Request_1.default.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ message: 'Request deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({
            message: 'Error deleting request',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
});
exports.deleteRequest = deleteRequest;
const searchRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.term;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        console.log('Searching for term:', searchTerm);
        const requests = yield Request_1.default.find({
            $or: [
                { requestId: { $regex: searchTerm, $options: 'i' } },
                { floor: { $regex: searchTerm, $options: 'i' } },
                { roomUnit: { $regex: searchTerm, $options: 'i' } },
                { block: { $regex: searchTerm, $options: 'i' } },
                { requestedBy: { $regex: searchTerm, $options: 'i' } },
                { phoneNumber: { $regex: searchTerm, $options: 'i' } },
                { location: { $regex: searchTerm, $options: 'i' } },
                { service: { $regex: searchTerm, $options: 'i' } },
                { department: { $regex: searchTerm, $options: 'i' } },
                { assignedTo: { $regex: searchTerm, $options: 'i' } },
            ]
        }).lean();
        console.log('Requests found:', requests.length);
        res.json(requests);
    }
    catch (error) {
        console.error('Error in searchRequests:', error);
        res.status(500).json({
            message: 'Internal server error occurred during search',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.searchRequests = searchRequests;
