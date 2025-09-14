import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("usertable", {
  userId: uuid("userId").primaryKey().notNull().defaultRandom(),
  name: varchar("name").notNull(),
  gender: varchar("gender").default("male").notNull(),
  age: integer("age").default(18).notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  confirmPassword: varchar("confirmPassword").notNull(),
});
