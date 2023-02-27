import type { NextApiRequest, NextApiResponse } from 'next';
import { stores } from './../../utils/data/stores';

// fake data

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);

  // fake loading time
  setTimeout(() => {
    res.status(200).json(stores);
  }, 800);
}
