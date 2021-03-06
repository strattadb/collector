import Knex from 'knex';

import { constants, timestamps } from './helpers';

const reactableReactionsTableName = 'reactableReactions';
const reactionsTableName = 'reactions';
const messagesTableName = 'messages';
const usersTableName = 'users';
const botsTableName = 'bots';

const reactionIdColumnName = 'reactionId';
const messageIdColumnName = 'messageId';
const userAuthorIdColumnName = 'userAuthorId';
const botAuthorIdColumnName = 'botAuthorId';

export async function up(knex: Knex): Promise<void> {
  await createReactableReactionsTable(knex);
  await addOnlyOneNonNullReactableContraint(knex);
  await addOnlyOneNonNullAuthorContraint(knex);
}

async function createReactableReactionsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(reactableReactionsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(reactionIdColumnName)
      .unsigned()
      .references('id')
      .inTable(reactionsTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer(messageIdColumnName)
      .unsigned()
      .references('id')
      .inTable(messagesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table
      .integer(userAuthorIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table
      .integer(botAuthorIdColumnName)
      .unsigned()
      .references('id')
      .inTable(botsTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table.unique([
      reactionIdColumnName,
      messageIdColumnName,
      userAuthorIdColumnName,
      botAuthorIdColumnName,
    ]);

    timestamps({ knex, table, updatedAt: false });
  });
}

export async function addOnlyOneNonNullReactableContraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${reactableReactionsTableName}"
    ADD CONSTRAINT only_one_non_null_reactable
    CHECK (
      (
        ("${messageIdColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function addOnlyOneNonNullAuthorContraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${reactableReactionsTableName}"
    ADD CONSTRAINT only_one_non_null_author
    CHECK (
      (
        ("${userAuthorIdColumnName}" IS NOT NULL)::integer +
        ("${botAuthorIdColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropReactableReactionsTable(knex);
}

async function dropReactableReactionsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(reactableReactionsTableName);
}
