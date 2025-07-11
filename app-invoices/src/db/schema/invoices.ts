import { timestamp } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const invoices = pgTable('invoices', {
  id: text().primaryKey(),
  customerId: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});