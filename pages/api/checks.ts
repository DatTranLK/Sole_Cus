import type { NextApiRequest, NextApiResponse } from 'next';

// fake data
import checks from '../../utils/data/checked';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);

  // fake loading time
  setTimeout(() => {
    res.status(200).json(checks);
  }, 800);
}
