import type { NextApiRequest, NextApiResponse } from 'next';
import reviewca from 'utils/data/reviewca';

// fake data
import products from '../../../utils/data/products';
import { stores } from './../../../utils/data/stores';
import { checked } from './../../../utils/data/checked';
import { brands } from './../../../utils/data/brands';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req

  const product = products.find(x => x.id === pid);
  res.status(200).json(product);

  const check = checked.find(x => x.id === pid);
  res.status(200).json(check);

  const review = reviewca.find(x => x.id === pid);
  res.status(200).json(review);

  const store = stores.find(x => x.id === pid);
  res.status(200).json(store);

  const brand = brands.find(x => x.id === pid);
  res.status(200).json(brand);
}
