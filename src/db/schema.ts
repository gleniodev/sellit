import { pgTable, decimal, timestamp, varchar, } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
    id: varchar('id', { length: 26 }).primaryKey(),
    categoryId: varchar('category_id', {length: 26}).notNull(),
    name: varchar('name', {length: 255}).notNull(),
    description: varchar('description', {length: 2000}).notNull(),
    producerName: varchar('producer_name', {length: 255}).notNull(),
    producerEmail: varchar('producer_email', {length: 255}).notNull(),
    cover: varchar('cover', {length: 500}).notNull(),
    thumbnail: varchar('thumbnail', {length: 500}).notNull(),
    price: decimal('price').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
})