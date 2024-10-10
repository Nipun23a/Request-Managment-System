export interface RequestData {
    _id: string;
    requestId: string;
    createdOn: string;
    floor: string;
    roomUnit: string;
    block: string;
    requestedBy: string;
    phoneNumber: string;
    location: string;
    service: string;
    status: 'NEW'| 'IN_PROGRESS'| 'COMPLETED'|'ON_HOLD'|'ESCALATED'|'DELAYED';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    department: string;
    assignedTo: string;
  }