import { supabase } from "@/integrations/supabase/client";

export interface InvoiceTemplateSettings {
  showLogo: boolean;
  logoUrl: string;
  companyName: string;
  companyNameAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  website: string;
  primaryColor: string;
  footerText: string;
  footerTextAr: string;
  showTaxBreakdown: boolean;
  taxLabel: string;
  taxLabelAr: string;
  currencySymbol: string;
  invoiceTitle: string;
  invoiceTitleAr: string;
  deliverySlipTitle: string;
  deliverySlipTitleAr: string;
}

const defaultTemplate: InvoiceTemplateSettings = {
  showLogo: true,
  logoUrl: "",
  companyName: "GREEN GRASS STORE",
  companyNameAr: "جرين جراس ستور",
  address: "Dubai, UAE",
  addressAr: "دبي، الإمارات",
  phone: "+971 54 775 1901",
  email: "info@greengrassstore.com",
  website: "www.greengrassstore.com",
  primaryColor: "#2d5a3d",
  footerText: "Thank you for shopping with us!",
  footerTextAr: "شكراً لتسوقكم معنا!",
  showTaxBreakdown: true,
  taxLabel: "VAT",
  taxLabelAr: "ضريبة القيمة المضافة",
  currencySymbol: "AED",
  invoiceTitle: "INVOICE",
  invoiceTitleAr: "فاتورة",
  deliverySlipTitle: "DELIVERY SLIP",
  deliverySlipTitleAr: "إيصال التسليم",
};

export const fetchInvoiceTemplate = async (): Promise<InvoiceTemplateSettings> => {
  let template = { ...defaultTemplate };

  try {
    const { data } = await supabase
      .from("site_settings")
      .select("setting_value")
      .eq("setting_key", "invoice_template")
      .single();

    if (data?.setting_value) {
      template = { ...template, ...(data.setting_value as Record<string, unknown>) };
    }
  } catch (error) {
    console.warn("Could not fetch invoice template; using defaults", error);
  }

  if (!template.logoUrl) {
    try {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "branding")
        .single();

      if (data?.setting_value) {
        const branding = data.setting_value as Record<string, any>;
        template.logoUrl = branding.logoUrl || template.logoUrl;
        if (branding.siteName && (!template.companyName || template.companyName === defaultTemplate.companyName)) {
          template.companyName = branding.siteName;
        }
      }
    } catch (error) {
      console.warn("Could not fetch branding fallback for invoice template", error);
    }
  }

  return template;
};

interface InvoiceOrderItem {
  name?: string;
  title?: string;
  quantity?: number;
  price?: number;
  total?: number;
}

interface InvoiceOrderData {
  order_number: string;
  created_at: string;
  status?: string;
  payment_method?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_address?: string;
  items?: InvoiceOrderItem[];
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
}

const formatCurrency = (symbol: string, value: number) => {
  return `${symbol} ${value.toFixed(2)}`;
};

export const buildInvoiceHtml = (order: InvoiceOrderData, template: InvoiceTemplateSettings) => {
  const items = Array.isArray(order.items) ? order.items : [];
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name || item.title || "Item"}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity || 1}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(template.currencySymbol, Number(item.price || item.total || 0))}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(template.currencySymbol, Number((item.price || item.total || 0) * (item.quantity || 1)))}</td>
        </tr>
      `
    )
    .join("");

  const subtotal = Number(order.subtotal ?? 0);
  const tax = Number(order.tax ?? 0);
  const shipping = Number(order.shipping ?? 0);
  const total = Number(order.total ?? subtotal + tax + shipping);

  const logoSection = template.showLogo && template.logoUrl
    ? `<img src="${template.logoUrl}" alt="${template.companyName}" style="max-height: 60px; max-width: 200px; margin-bottom: 10px;" />`
    : `<h1 style="color: ${template.primaryColor}; margin: 0;">${template.companyName}</h1>`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${template.invoiceTitle} - ${order.order_number}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; max-width: 860px; margin: 0 auto; color: #111827; }
        .header { text-align: center; margin-bottom: 24px; border-bottom: 2px solid ${template.primaryColor}; padding-bottom: 16px; }
        .header h1 { color: ${template.primaryColor}; margin: 0; }
        .muted { color: #6b7280; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }
        .box { background: #f9fafb; padding: 14px; border-radius: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th { background: ${template.primaryColor}; color: white; text-align: left; padding: 10px; }
        td { padding: 10px; }
        .totals { text-align: right; margin-top: 16px; }
        .totals p { margin: 6px 0; }
        .total-row { font-size: 18px; font-weight: 700; color: ${template.primaryColor}; }
        .footer { text-align: center; margin-top: 28px; padding-top: 12px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        @media print { body { padding: 16px; } }
      </style>
    </head>
    <body>
      <div class="header">
        ${logoSection}
        <p class="muted" style="margin: 6px 0;">${template.website}</p>
        <p class="muted" style="margin: 0;">${template.address} | ${template.phone}</p>
      </div>

      <h2 style="text-align: center; color: ${template.primaryColor}; margin: 0 0 12px;">${template.invoiceTitle}</h2>
      <p class="muted" style="text-align: center; margin: 0 0 24px;">${new Date(order.created_at).toLocaleDateString()}</p>

      <div class="grid">
        <div class="box">
          <h3 style="margin: 0 0 8px; color: ${template.primaryColor}; font-size: 14px;">Billed To</h3>
          <p style="margin: 0; line-height: 1.6;">
            ${order.customer_name || ""}<br />
            ${order.customer_email || ""}<br />
            ${order.customer_phone || ""}<br />
            ${order.customer_address || ""}
          </p>
        </div>
        <div class="box">
          <h3 style="margin: 0 0 8px; color: ${template.primaryColor}; font-size: 14px;">Invoice Details</h3>
          <p style="margin: 0; line-height: 1.6;">
            <strong>Invoice #:</strong> ${order.order_number}<br />
            <strong>Status:</strong> ${(order.status || "pending").toString().toUpperCase()}<br />
            <strong>Payment:</strong> ${order.payment_method || "Cash on Delivery"}
          </p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div class="totals">
        <p>Subtotal: ${formatCurrency(template.currencySymbol, subtotal)}</p>
        ${template.showTaxBreakdown ? `<p>${template.taxLabel}: ${formatCurrency(template.currencySymbol, tax)}</p>` : ""}
        <p>Shipping: ${formatCurrency(template.currencySymbol, shipping)}</p>
        <p class="total-row">Total: ${formatCurrency(template.currencySymbol, total)}</p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 6px;">${template.footerText}</p>
        <p style="margin: 0;">Questions? Email ${template.email}</p>
      </div>
    </body>
    </html>
  `;
};
