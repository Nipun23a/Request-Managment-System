import RequestModel from "../models/Request";
import { Request,Response } from "express";

export const getAllRequest = async (req: Request, res: Response) => {
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

export const createRequest = async(req:Request,res:Response) =>{
    try{
        const newRequest = new RequestModel(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    }catch(error){
        res.status(400).json({message:'Error creating request',error})
    }
};

export const updateRequest = async(req:Request,res:Response) => {
    try {
        const updateRequest = await RequestModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updateRequest){
            res.status(404).json({message:'Request not found'})
        }
        res.json(updateRequest);
    } catch (error) {
        res.status(400).json({message:'Error updating request',error})
    }
};


export const deleteRequest = async(req:Request,res:Response)=>{
    try{
        const deleteRequest = await RequestModel.findByIdAndDelete(req.params.id);
        if(!deleteRequest){
            res.status(404).json({message:'Request not found'});
        }
        res.json({message:'Request deleted succefully'});
    }catch(error){
        res.status(500).json({message:'Error deleting request',error})
    }
};