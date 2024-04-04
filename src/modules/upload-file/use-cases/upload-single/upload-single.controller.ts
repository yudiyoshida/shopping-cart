import { Request, Response } from 'express';

export class UploadSingleController {
  public async handle(req: Request, res: Response): Promise<void> {
    const url = req.file?.location ?? null;

    res.status(200).json({ url });
  }
}
