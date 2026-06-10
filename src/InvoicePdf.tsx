import React from "react";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Geist Mono",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Regular.woff2",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Medium.woff2",
      fontWeight: 500,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Bold.woff2",
      fontWeight: 700,
    },
  ],
});

export type PartyDetails = {
  name: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  vatId?: string;
};

export type InvoiceItem = {
  name: string;
  quantity: number | string;
  price: number;
};

export type PaymentDetails = {
  bank?: string;
  accountNumber?: string;
  iban?: string;
};

export type InvoiceData = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  from: PartyDetails;
  to: PartyDetails;
  items: InvoiceItem[];
  salesTax: number;
  total?: number;
  paymentDetails?: PaymentDetails;
  note?: string;
  currencySymbol?: string;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#111111",
    color: "#F5F5F5",
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 36,
    fontFamily: "Geist Mono",
    fontSize: 11,
    lineHeight: 1.5,
  },
  logoBox: {
    width: 52,
    height: 52,
    backgroundColor: "#F3F3F3",
    marginBottom: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#111111",
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
    marginTop: 4,
  },
  topMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 44,
    gap: 16,
  },
  metaBlock: {
    flex: 1,
  },
  labelInline: {
    color: "#8B8B8B",
    fontSize: 10.5,
    marginBottom: 6,
  },
  valueInline: {
    fontSize: 11.5,
    color: "#F3F3F3",
  },
  twoColRow: {
    flexDirection: "row",
    gap: 28,
    marginBottom: 36,
  },
  col: {
    flex: 1,
  },
  sectionLabel: {
    color: "#8B8B8B",
    fontSize: 10.5,
    marginBottom: 10,
  },
  bodyText: {
    color: "#F5F5F5",
    fontSize: 11.5,
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 4,
  },
  itemCol: {
    flex: 1.8,
    paddingRight: 16,
  },
  qtyCol: {
    flex: 0.7,
    alignItems: "flex-start",
  },
  priceCol: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  tableHeaderText: {
    color: "#8B8B8B",
    fontSize: 10.5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  summaryWrap: {
    width: 300,
    marginLeft: "auto",
    marginTop: 20,
    marginBottom: 170,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
    marginTop: 6,
    marginBottom: 16,
  },
  summaryLabel: {
    color: "#8B8B8B",
    fontSize: 10.5,
  },
  summaryValue: {
    color: "#EDEDED",
    fontSize: 11.5,
  },
  totalLabel: {
    color: "#A0A0A0",
    fontSize: 10.5,
  },
  totalValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 700,
  },
  footerRow: {
    flexDirection: "row",
    gap: 28,
    marginTop: "auto",
  },
});

const formatMoney = (value: number, symbol = "$") => {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${symbol}${formatted}`;
};

const computeSubtotal = (items: InvoiceItem[]) =>
  items.reduce((sum, item) => sum + Number(item.quantity) * item.price, 0);

export function InvoicePdf({
  data,
}: {
  data: InvoiceData;
}) {
  const currencySymbol = data.currencySymbol ?? "$";
  const subtotal = computeSubtotal(data.items);
  const total = data.total ?? subtotal + data.salesTax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>L</Text>
        </View>

        <View style={styles.topMetaRow}>
          <View style={styles.metaBlock}>
            <Text style={styles.labelInline}>Invoice NO:</Text>
            <Text style={styles.valueInline}>{data.invoiceNumber}</Text>
          </View>

          <View style={styles.metaBlock}>
            <Text style={styles.labelInline}>Issue date:</Text>
            <Text style={styles.valueInline}>{data.issueDate}</Text>
          </View>

          <View style={styles.metaBlock}>
            <Text style={styles.labelInline}>Due date:</Text>
            <Text style={styles.valueInline}>{data.dueDate}</Text>
          </View>
        </View>

        <View style={styles.twoColRow}>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>From</Text>
            <Text style={styles.bodyText}>{data.from.name}</Text>
            {data.from.email ? <Text style={styles.bodyText}>{data.from.email}</Text> : null}
            {data.from.phone ? <Text style={styles.bodyText}>{data.from.phone}</Text> : null}
            {data.from.addressLine1 ? (
              <Text style={styles.bodyText}>{data.from.addressLine1}</Text>
            ) : null}
            {data.from.addressLine2 ? (
              <Text style={styles.bodyText}>{data.from.addressLine2}</Text>
            ) : null}
            {data.from.vatId ? <Text style={styles.bodyText}>VAT ID: {data.from.vatId}</Text> : null}
          </View>

          <View style={styles.col}>
            <Text style={styles.sectionLabel}>To</Text>
            <Text style={styles.bodyText}>{data.to.name}</Text>
            {data.to.email ? <Text style={styles.bodyText}>{data.to.email}</Text> : null}
            {data.to.phone ? <Text style={styles.bodyText}>{data.to.phone}</Text> : null}
            {data.to.addressLine1 ? (
              <Text style={styles.bodyText}>{data.to.addressLine1}</Text>
            ) : null}
            {data.to.addressLine2 ? (
              <Text style={styles.bodyText}>{data.to.addressLine2}</Text>
            ) : null}
            {data.to.vatId ? <Text style={styles.bodyText}>VAT ID: {data.to.vatId}</Text> : null}
          </View>
        </View>

        <View style={styles.tableHeader}>
          <View style={styles.itemCol}>
            <Text style={styles.tableHeaderText}>Item</Text>
          </View>
          <View style={styles.qtyCol}>
            <Text style={styles.tableHeaderText}>Quantity</Text>
          </View>
          <View style={styles.priceCol}>
            <Text style={styles.tableHeaderText}>Price</Text>
          </View>
        </View>

        {data.items.map((item, index) => (
          <View style={styles.tableRow} key={`${item.name}-${index}`}>
            <View style={styles.itemCol}>
              <Text style={styles.bodyText}>{item.name}</Text>
            </View>
            <View style={styles.qtyCol}>
              <Text style={styles.bodyText}>{String(item.quantity)}</Text>
            </View>
            <View style={styles.priceCol}>
              <Text style={styles.bodyText}>{formatMoney(item.price, currencySymbol)}</Text>
            </View>
          </View>
        ))}

        <View style={styles.summaryWrap}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sales tax</Text>
            <Text style={styles.summaryValue}>{formatMoney(data.salesTax, currencySymbol)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatMoney(total, currencySymbol)}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Payment details</Text>
            {data.paymentDetails?.bank ? (
              <Text style={styles.bodyText}>Bank: {data.paymentDetails.bank}</Text>
            ) : null}
            {data.paymentDetails?.accountNumber ? (
              <Text style={styles.bodyText}>
                Account number: {data.paymentDetails.accountNumber}
              </Text>
            ) : null}
            {data.paymentDetails?.iban ? (
              <Text style={styles.bodyText}>Iban: {data.paymentDetails.iban}</Text>
            ) : null}
          </View>

          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Note</Text>
            <Text style={styles.bodyText}>{data.note ?? ""}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
