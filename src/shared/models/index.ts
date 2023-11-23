import { Request } from 'express';

import { User } from '../../users';

export interface AppRequest extends Request {
  user?: User
}

export enum StatusType {
  ORDERED = 'ORDERED',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN = 'OPEN'
}
