# react-invoice

A React PDF invoice matching the provided mockup style using `@react-pdf/renderer` and Geist Mono.

## Install

```bash
npm install
```

## Generate the PDF

```bash
npm run build:invoice
```

This writes `invoice.pdf` to the project root.

## Files

- `src/InvoicePdf.tsx` — reusable invoice PDF component
- `src/example.tsx` — example data + PDF generation script
