CREATE TABLE "UserTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"gender" varchar DEFAULT 'male' NOT NULL,
	"age" integer DEFAULT 18 NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"confirmPassword" varchar NOT NULL,
	CONSTRAINT "UserTable_email_unique" UNIQUE("email")
);
