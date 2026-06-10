import React from "react";
import { pdf } from "@react-pdf/renderer";
import { InvoiceData, InvoicePdf } from "./InvoicePdf";
import fs from "node:fs/promises";
import path from "node:path";

const invoiceData: InvoiceData = {
  invoiceNumber: "INV-01",
  issueDate: "08/12/2024",
  dueDate: "08/12/2024",
  from: {
    name: "Lost island AB",
    email: "Pontus@lostisland.com",
    phone: "36182-4441",
    addressLine1: "Roslagsgatan 48",
    addressLine2: "211 34 Stockholm, Sweden",
    vatId: "SE1246767676020",
  },
  to: {
    name: "Acme inc",
    email: "John.doe@acme.com",
    phone: "36182-4441",
    addressLine1: "Street 56",
    addressLine2: "243 21 California, USA",
    vatId: "SE1246767676020",
  },
  items: [
    {
      name: "Product design",
      quantity: 145,
      price: 1400,
    },
  ],
  salesTax: 2750,
  total: 23750,
  paymentDetails: {
    bank: "Chase",
    accountNumber: "085629563",
    iban: "0515113134346131313",
  },
  note: "Thanks for great collaboration",
  currencySymbol: "$",
};

async function main() {
  const outputPath = path.resolve(process.cwd(), "invoice.pdf");
  const instance = <InvoicePdf data={invoiceData} />;
  const buffer = await pdf(instance).toBuffer();
  await fs.writeFile(outputPath, buffer);
  console.log(`Invoice written to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
