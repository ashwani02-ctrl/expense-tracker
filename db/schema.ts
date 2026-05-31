import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  icon: text("icon"),
  createdBy: text("createdBy")
  .notNull()
  .references(()=> users.email),
  createdAt: timestamp("createdAt").defaultNow(),
});
