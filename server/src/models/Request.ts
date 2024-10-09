import mongoose,{Schema,Document} from "mongoose";


// Interface for a Request Document
export interface IRequest extends Document {
    requestId : string;
    createdOn : Date;
    location: string;
    service : string;
    status : 'NEW'|'IN_PROGRESS'|'ON_HOLD'|'REJECTED'|'CANCELLED';
    priority: 'HIGH'|'MEDIUM'|'LOW';
    department: string;
    requestedBy: string;
    assignedTo: string;
}

// Schema for a request
const RequestSchema : Schema = new Schema ({
    requestId : {type: String, required:true, unique: true},
    createdOn: {type: Date, default: Date.now},
    location: {type:String, required: true},
    service : {type:String,required: true},
    status: { 
        type: String, 
        enum: ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED'],
        default: 'NEW'
    },
    priority: { 
        type: String, 
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true
    },
    department: { type: String, required: true },
    requestedBy: { type: String, required: true },
    assignedTo: { type: String, required: true }
},{
    timestamps:true
});


export default mongoose.model<IRequest>('Request',RequestSchema);

