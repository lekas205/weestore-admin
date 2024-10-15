import { ORDER_STATUS, PAYMENT_METHOD } from "./common";
import { formatDate, formatAsMoney } from "@/utils";

export const feilds = {
  drivers: {
    "First Name": "first_name",
    "Last Name": "last_name",
    Email: "email",
    "Phone Number": "phone",
    Lincense: "lincense",
    State: "state",
    Warehouse: "warehouse",
  },
  fleet: {
    "Order No": "order_no",
    "Customer Name": "customer_name",
    "Driver Name": "driver_name",
    Date: {
      field: "created_at",
      callback: (value) => {
        return formatDate(value);
      },
    },
    "Payment Method": {
      field: "payment_method",
      callback: (value) => {
        return PAYMENT_METHOD[value];
      },
    },
    Status: {
      field: "status",
      callback: (value) => {
        return ORDER_STATUS[value];
      },
    },
  },

  orders: {
    "Order No": "order_no",
    Warehouse: "warehouse_name",
    "Reseller Name": "customer_name",
    Amount: {
      field: "amount",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    Date: {
      field: "created_data",
      callback: (value) => {
        return formatDate(value);
      },
    },
    "Payment Method": {
      field: "payment_method",
      callback: (value) => {
        return PAYMENT_METHOD[value];
      },
    },
    Status: {
      field: "status",
      callback: (value) => {
        return ORDER_STATUS[value];
      },
    },
  },

  wallet: {
    "First Name": "first_name",
    "Last Name": "last_name",
    "Amount in Wallet": {
      field: "amount",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
  },

  warehouse: {
    Wareehouse: "warehouse_name",
    State: "city",
    "Manager Name": "manager_name",
    "Phone No": "phone",
    Address: "address",
  },

  customers: {
    "First Name": "first_name",
    "Last Name": "last_name",
    Eamil: "email",
    "Phone No": "phone",
    "Reg Date": {
      field: "registration_date",
      callback: (value) => {
        return formatDate(value);
      },
    },
  },

  productInfo: {
    "Product Name": "product_name",
    Category: "category",
    Manufacturer: "manufacturer",
    Warehouse: "warehouse",
    Quantity: "stock_quantity",
    Price: {
      field: "price",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
  },

  productMetrics: {
    "Product Name": "product_name",
    Category: "category",
    Manufacturer: "manufacturer",
    Warehouse: "warehouse",
    "Quantity in Stock": "stock_quantity",
    "Quantity Sold": "quantity_bought",
    Price: {
      field: "price",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
  },
  cashFlow: {
    "Reseller Name": "resellerName",
    "Phone No": "phone",
    Amount: {
      field: "amount",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    "Payment Method": {
      field: "paymentChannel",
      callback: (value) => {
        return PAYMENT_METHOD[value];
      },
    },
    refereence: "reference",
    Date: "date",
  },
  salesInflow: {
    "Order No": "orderNo",
    "Reseller Name": "resellerName",
    "Phone No": "phone",
    "Quantity Sold": "quantity_bought",
    "Order Amount": {
      field: "orderAmount",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    "Amount Paid": {
      field: "amountPaid",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    "Payment Method": {
      field: "channel",
      callback: (value) => {
        return PAYMENT_METHOD[value];
      },
    },
    Date: "date",
  },
};
