declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        role: string;
        workspaceId: number | null;
        // password?: string;
        // createdAt: Date;
        // updatedAt: Date;
      };
    }
  }
}

export {};
