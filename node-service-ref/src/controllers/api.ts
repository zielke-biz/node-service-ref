'use strict';


// eslint-disable-next-line no-unused-vars
import {Response, Request} from 'express';

/**
 * Genereal index request.
 *
 * @param {Request} req request object.
 * @param {Response} res response object.
 */
export const getApi = (req: Request, res: Response) => {
  res.render('api/index', {
    title: 'API Examples',
  });
};

/**
 * Get Demo data.
 * @param {Request} req request object.
 * @param {Response} res response object.
 */
export const getDemo = (req: Request, res: Response) => {
  res.status(200).send('{data: \'hello world\'}');
};
