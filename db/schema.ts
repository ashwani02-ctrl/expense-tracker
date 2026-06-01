import { pgTable, serial, text, numeric, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  password: text("password").notNull(),
});

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy")
  .notNull()
  .references(()=> users.email),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const expenses = pgTable("expenses",{
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  budgetId: integer("budgetId").references(()=>budgets.id),
  createdAt: varchar("createdAt").notNull()
})