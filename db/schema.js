import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
export const documents = sqliteTable('documents', {
  workspace: text('workspace').notNull(), id: text('id').notNull(),
  title: text('title').notNull(), state: text('state').notNull(),
  revision: integer('revision').notNull().default(1), updated: text('updated').notNull(),
}, t => [primaryKey({ columns: [t.workspace, t.id] })]);
export const courses = sqliteTable('courses', {
  workspace: text('workspace').notNull(), id: text('id').notNull(),
  data: text('data').notNull(), revision: integer('revision').notNull().default(1), updated: text('updated').notNull(),
}, t => [primaryKey({ columns: [t.workspace, t.id] })]);
