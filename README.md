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

## View the PDF in the browser

```bash
npm run dev
```

The page includes a PDF viewer that loads the bundled `invoice.pdf` by default.
You can also select any local PDF file from the UI for quick preview.

## Files

- `src/InvoicePdf.tsx` — reusable invoice PDF component
- `src/example.tsx` — example data + PDF generation script
- `src/main.tsx` — web PDF viewer app
