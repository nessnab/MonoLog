declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        role: string;
        // password?: string; // Optional if you exclude it during login
        // createdAt: Date;
        // workspaceId: number | null;
        // updatedAt: Date;
      };
    }
  }
}

export {};
