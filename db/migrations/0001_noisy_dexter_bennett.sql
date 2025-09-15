ALTER TABLE "UserTable" RENAME TO "usertable";--> statement-breakpoint
ALTER TABLE "usertable" DROP CONSTRAINT "UserTable_email_unique";--> statement-breakpoint
ALTER TABLE "usertable" ADD COLUMN "userId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "usertable" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "usertable" ADD CONSTRAINT "usertable_email_unique" UNIQUE("email");