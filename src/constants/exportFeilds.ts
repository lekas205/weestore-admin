import { ORDER_STATUS, PAYMENT_METHOD } from "./common";
import { formatDate, formatAsMoney } from "@/utils";

export const feilds = {
  drivers: {
    "First Name": "first_name",
    "Last Name": "last_name",
    // Email: "email",
    "Phone Number": "phone",
    Lincense: "license",
    State: "state",
    Warehouse: "warehouse",
    "Sales Performance": {
      field: "sales_performance",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
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
    "Amount Paid": {
      field: "amount",
      callback: (value) => {
        return formatAsMoney(value);
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
    "Amount Paid": {
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

  orders_returned: {
    "Order No": "order_no",
    Warehouse: "warehouse_name",
    "Reseller Name": "customer_name",
    "Order Amount": {
      field: "amount",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    "Amount Paid": {
      field: "amount_paid",
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
    Warehouse: "warehouse_name",
    Quantity: "stock_quantity",
    Price: {
      field: "price",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    Status: "status",
  },

  productMetrics: {
    "Product Name": "product_name",
    Category: "category",
    Manufacturer: "manufacturer",
    Warehouse: "warehouse_name",
    "Quantity Available": "stock_quantity",
    "Quantity Sold": "quantity_bought",
    "Value of qty in Stock": {
      field: "in_stock_value",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    "Value of qty out of Stock": {
      field: "out_stock_value",
      callback: (value) => {
        return formatAsMoney(value);
      },
    },
    "Sales Price": {
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
    status: "status",
  },
};
