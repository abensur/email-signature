CREATE TABLE `signatures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`logoUrl` text NOT NULL,
	`website` text NOT NULL,
	`phone` text NOT NULL,
	`phoneAlt` text NOT NULL,
	`socialText` text NOT NULL,
	`disclaimer` text NOT NULL,
	`showEmail` integer,
	`showSocial` integer,
	`showLogo` integer,
	`social` blob
);
