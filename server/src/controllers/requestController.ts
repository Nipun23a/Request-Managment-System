import RequestModel,{IRequest} from "../models/Request";
import { Request,Response } from "express";

export const getAllRequests = async (req: Request, res: Response) => {
    try{
        const requests = await RequestModel.find();
        res.json(requests);
    }catch (error){
        res.status(500).json({message:'Error fetching requests', error});
    }
};

export const getRequestById = async (req:Request,res:Response) => {
    try{
        const request = await RequestModel.findById(req.params.id);
        if(!request){
            return res.status(404).json({message:'Request not found'});
        }
        res.json(request)
    }catch(error){
        res.status(500).json({message:'Error fetching request',error});
    }
};

export const createRequest = async (req: Request, res: Response) => {
    try {
      const {
        floor,
        roomUnit,
        block,
        requestedBy,
        phoneNumber,
        location,
        service,
        department
      } = req.body;
  
      const newRequest: IRequest = new RequestModel({
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
  
      const savedRequest = await newRequest.save();
      res.status(201).json(savedRequest);
    } catch (error: unknown) {
      console.error('Error creating request:', error);
      res.status(400).json({ 
        message: 'Error creating request', 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  export const updateRequest = async (req: Request, res: Response) => {
    try {
        const updatedRequest = await RequestModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json(updatedRequest);
    } catch (error: unknown) {
        console.error('Error updating request:', error);
        res.status(400).json({ 
            message: 'Error updating request', 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        });
    }
};
export const deleteRequest = async (req: Request, res: Response) => {
    try {
        const deletedRequest = await RequestModel.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ message: 'Request deleted successfully' });
    } catch (error: unknown) {
        console.error('Error deleting request:', error);
        res.status(500).json({ 
            message: 'Error deleting request', 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        });
    }
};


export const searchRequests = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.term as string;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        console.log('Searching for term:', searchTerm);

        const requests = await RequestModel.find({
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
    } catch (error) {
        console.error('Error in searchRequests:', error);
        res.status(500).json({
            message: 'Internal server error occurred during search',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
