-- CreateTable
CREATE TABLE "barbershop" (
    "id" TEXT NOT NULL,
    "is_open" BOOLEAN NOT NULL,
    "opened_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barbershop_pkey" PRIMARY KEY ("id")
);
