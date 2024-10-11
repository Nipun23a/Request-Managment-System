"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the Counter schema and model outside of the hook
const CounterSchema = new mongoose_1.Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});
const Counter = mongoose_1.default.models.Counter || mongoose_1.default.model('Counter', CounterSchema);
// Schema for a Request
const RequestSchema = new mongoose_1.Schema({
    requestId: { type: String, unique: true },
    createdOn: { type: Date, default: Date.now },
    floor: { type: String, required: true },
    roomUnit: { type: String, required: true },
    block: { type: String, required: true },
    requestedBy: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    service: { type: String, required: true },
    status: {
        type: String,
        enum: ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'ESCALATED', 'COMPLETED', 'DELAYED'],
        default: 'NEW'
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        default: 'MEDIUM'
    },
    department: { type: String, required: true },
    assignedTo: { type: String, default: 'Mohamed' }
}, {
    timestamps: true
});
// Pre-save hook to generate and increment requestId
RequestSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew) {
            return next();
        }
        try {
            const counter = yield Counter.findByIdAndUpdate({ _id: 'requestId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            if (counter && counter.seq) {
                this.requestId = `SKMCAA${counter.seq.toString().padStart(4, '0')}`;
            }
            else {
                throw new Error('Failed to generate request ID');
            }
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                next(error);
            }
            else {
                next(new Error('An unknown error occurred'));
            }
        }
    });
});
exports.default = mongoose_1.default.models.Request || mongoose_1.default.model('Request', RequestSchema);
