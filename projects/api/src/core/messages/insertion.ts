import db from '../db';
import { DBOptions } from '../types';
import { messagesTableName } from './constants';
import { Message } from './types';

export type InsertMessageArgs = Pick<
  Message,
  'senderId' | 'channelId' | 'content'
> &
  Partial<Pick<Message, 'parentMessageId'>>;

/**
 * Inserts a message.
 */
export async function insertUser(
  args: InsertMessageArgs,
  opts: DBOptions = {},
): Promise<Message> {
  const message = await doInsertMessage(args);

  return message;
}

export type DoInsertMessageArgs = Pick<
  Message,
  'senderId' | 'channelId' | 'content'
> &
  Partial<Pick<Message, 'parentMessageId'>>;

export async function doInsertMessage(
  args: DoInsertMessageArgs,
  opts: DBOptions = {},
): Promise<Message> {
  const query = db
    .insert(args)
    .into(messagesTableName)
    .returning('*');

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  const [message] = await query;

  return message;
}
