import { type DemoRequest, type InsertDemoRequest } from "@shared/schema";

export interface IStorage {
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
}

export class MemStorage implements IStorage {
  private requests: Map<number, DemoRequest>;
  private currentId: number;

  constructor() {
    this.requests = new Map();
    this.currentId = 1;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const id = this.currentId++;
    const request: DemoRequest = {
      ...insertRequest,
      id,
      createdAt: new Date(),
    };
    this.requests.set(id, request);
    return request;
  }
}

export const storage = new MemStorage();
