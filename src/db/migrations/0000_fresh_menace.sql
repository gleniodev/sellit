CREATE TABLE "products" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"category_id" varchar(26) NOT NULL,
	"name" varchar(2000) NOT NULL,
	"producer_name" varchar(255) NOT NULL,
	"producer_email" varchar(255) NOT NULL,
	"cover" varchar(500) NOT NULL,
	"thumbnail" varchar(500) NOT NULL,
	"price" numeric NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
