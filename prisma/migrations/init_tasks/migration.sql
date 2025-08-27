-- CreateEnum
CREATE TYPE "public"."TaskLabel" AS ENUM ('bug', 'feature', 'documentation');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('backlog', 'todo', 'in_progress', 'canceled', 'done');

-- CreateEnum
CREATE TYPE "public"."TaskPriority" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "label" "public"."TaskLabel" NOT NULL,
    "status" "public"."TaskStatus" NOT NULL,
    "priority" "public"."TaskPriority" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignee" TEXT,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
