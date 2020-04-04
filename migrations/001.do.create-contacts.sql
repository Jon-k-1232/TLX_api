drop table if exists contact_info;

CREATE TABLE contact_info (
    userid INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "company" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "managerName" TEXT NULL,
    "managerId" INTEGER NULL,
    "groupId" INTEGER NOT NULL
);
