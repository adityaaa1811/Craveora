import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: "CRV-2026-98745",
      date: "2026-07-12",
      status: "Delivered",
      amount: 82.50,
      deliveryAddress: {
        name: "Aditya Mishra",
        phone: "+18005550199",
        street: "742 Evergreen Terrace",
        city: "Springfield",
        state: "IL",
        postalCode: "62704",
        country: "United States"
      },
      items: [
        {
          id: "p1",
          title: "Truffle Ribeye Steak",
          price: 58.00,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300"
        },
        {
          id: "p4",
          title: "Botanical Citrus Juice",
          price: 12.25,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=300"
        }
      ],
      timeline: [
        { time: "11:20 AM", label: "Order Placed", desc: "Your gourmet selection request has been successfully recorded." },
        { time: "11:25 AM", label: "Preparing", desc: "Chef has started composing and dressing your choices." },
        { time: "11:45 AM", label: "In Transit", desc: "Order handed over to insulated delivery valet." },
        { time: "12:05 PM", label: "Delivered", desc: "Successfully delivered. Bon Appétit!" }
      ],
      paymentSummary: {
        subtotal: 82.50,
        discount: 10.00,
        deliveryFee: 0.00,
        tax: 5.80,
        grandTotal: 82.50,
        paymentMethod: "Card"
      }
    },
    {
      id: "CRV-2026-97621",
      date: "2026-06-28",
      status: "Delivered",
      amount: 62.00,
      deliveryAddress: {
        name: "Aditya Mishra",
        phone: "+18005550199",
        street: "742 Evergreen Terrace",
        city: "Springfield",
        state: "IL",
        postalCode: "62704",
        country: "United States"
      },
      items: [
        {
          id: "p2",
          title: "Lobster Thermidor",
          price: 55.00,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1553618551-fba689030290?q=80&w=300"
        },
        {
          id: "p5",
          title: "Classic Lemonade",
          price: 7.00,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=300"
        }
      ],
      timeline: [
        { time: "07:15 PM", label: "Order Placed", desc: "Your gourmet selection request has been successfully recorded." },
        { time: "07:22 PM", label: "Preparing", desc: "Chef has started composing and dressing your choices." },
        { time: "07:40 PM", label: "In Transit", desc: "Order handed over to insulated delivery valet." },
        { time: "08:02 PM", label: "Delivered", desc: "Successfully delivered. Bon Appétit!" }
      ],
      paymentSummary: {
        subtotal: 62.00,
        discount: 0.00,
        deliveryFee: 0.00,
        tax: 4.96,
        grandTotal: 62.00,
        paymentMethod: "UPI"
      }
    }
  ]
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const order = action.payload;
      
      // Auto-generate order metrics if not passed
      const finalOrder = {
        id: order.id || `CRV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        date: order.date || new Date().toISOString().split("T")[0],
        status: order.status || "Preparing",
        amount: order.amount,
        deliveryAddress: order.deliveryAddress,
        items: order.items,
        timeline: order.timeline || [
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), label: "Order Placed", desc: "Your gourmet selection request has been successfully recorded." },
          { time: "", label: "Preparing", desc: "Chef has started composing and dressing your choices." },
          { time: "", label: "In Transit", desc: "Order handed over to insulated delivery valet." },
          { time: "", label: "Delivered", desc: "Successfully delivered. Bon Appétit!" }
        ],
        paymentSummary: order.paymentSummary || {
          subtotal: order.amount,
          discount: 0,
          deliveryFee: 0,
          tax: Math.round(order.amount * 0.08 * 100) / 100,
          grandTotal: order.amount,
          paymentMethod: "Card"
        }
      };
      
      // Push order to the beginning of the list (recent first)
      state.orders.unshift(finalOrder);
    },
    cancelOrder: (state, action) => {
      const id = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order && order.status === "Preparing") {
        order.status = "Cancelled";
        order.timeline.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          label: "Cancelled",
          desc: "Order has been cancelled and refund initiated."
        });
      }
    }
  }
});

// Actions
export const { addOrder, cancelOrder } = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrderById = (id) => (state) => 
  state.orders.orders.find((o) => o.id === id);

// Reducer
export default ordersSlice.reducer;
