import mongoose, { Schema, Document, CallbackError } from "mongoose";

// Interface for a Request Document
export interface IRequest extends Document {
  requestId: string;
  createdOn: Date;
  floor: string;
  roomUnit: string;
  block: string;
  requestedBy: string;
  phoneNumber: string;
  location: string;
  service: string;
  status:'NEW'| 'IN_PROGRESS'| 'COMPLETED'|'ON_HOLD'|'ESCALATED'|'DELAYED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  department: string;
  assignedTo: string;
}

// Schema for a request
const RequestSchema: Schema = new Schema({
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
    enum: ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'ESCALATED', 'COMPLETED','DELAYED'],
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
RequestSchema.pre('save', async function(next) {
    if (!this.isNew) {
      return next();
    }
  
    const Counter = mongoose.model('counter', new Schema({
      _id: String,
      seq: { type: Number, default: 0 }
    }));
  
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'requestId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
  
      if (counter && counter.seq) {
        this.requestId = `SKMCAA${counter.seq.toString().padStart(4, '0')}`;
      } else {
        throw new Error('Failed to generate request ID');
      }
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error('An unknown error occurred'));
      }
    }
  });
  
  export default mongoose.model<IRequest>('Request', RequestSchema);