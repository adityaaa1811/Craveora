import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, ShoppingBag } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { selectOrders } from "../store/slices/ordersSlice";
import { Card, Button, Badge } from "../components/ui";

export const OrdersPage = () => {
  const navigate = useNavigate();
  const orders = useAppSelector(selectOrders);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Preparing":
        return "primary";
      case "In Transit":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "neutral";
    }
  };

  // Filter & Search logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        order.items.some((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      
      const matchesFilter = activeFilter === "All" || order.status === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, activeFilter]);

  const filterTabs = ["All", "Preparing", "In Transit", "Delivered", "Cancelled"];

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters Header */}
      <div className="flex flex-col gap-4 pl-1 select-none">
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
          Gourmet Order History
        </h3>
        
        {/* Search controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search by Order ID or dish name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-text-muted"
            />
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-3" />
          </div>

          {/* Horizontal scrollable status filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-full text-2xs font-extrabold transition-all border cursor-pointer whitespace-nowrap ${
                  activeFilter === tab
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface border-border text-text-secondary hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-5">
        {filteredOrders.length === 0 ? (
          <Card className="p-16 text-center flex flex-col items-center justify-center gap-3 bg-surface border border-border/20">
            <ShoppingBag className="w-12 h-12 text-neutral-300 stroke-[1.5]" />
            <p className="text-xs text-text-secondary font-bold">No orders found matching criteria</p>
            <p className="text-[10px] text-text-muted max-w-xs mt-1">
              Adjust filters or keywords to scan all past delicacies.
            </p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card 
              key={order.id} 
              className="p-5 md:p-6 border border-border/30 bg-surface shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light/80 pb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-black text-text-primary font-mono">{order.id}</span>
                  <span className="text-[10px] text-text-muted font-bold font-mono uppercase">{order.date}</span>
                </div>
                <Badge variant={getStatusColor(order.status)} className="h-5 text-[9px] flex items-center leading-none">
                  {order.status}
                </Badge>
              </div>

              {/* Items Detail Preview */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="flex -space-x-4 shrink-0 overflow-hidden py-1">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.title}
                        className="w-11 h-11 rounded-xl object-cover bg-neutral-100 border-2 border-surface shadow-sm shrink-0"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-11 h-11 rounded-xl bg-neutral-100 border-2 border-surface shadow-sm flex items-center justify-center text-[10px] font-black text-text-secondary shrink-0 z-10">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-extrabold text-text-primary truncate">
                      {order.items.map(i => `${i.title} (x${i.quantity})`).join(", ")}
                    </span>
                    <span className="text-[10px] text-text-muted mt-1 font-semibold uppercase">
                      Total: {formatPrice(order.amount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end select-none shrink-0">
                  <Button 
                    onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    variant="outline" 
                    size="sm"
                    className="h-9 px-4 text-[10px] gap-1 hover:border-primary/20"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Mock Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between text-2xs font-extrabold text-text-secondary pl-1 select-none mt-4">
          <span>Showing {filteredOrders.length} orders</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled className="h-8 px-3 text-[10px] opacity-40">Previous</Button>
            <Button size="sm" variant="outline" disabled className="h-8 px-3 text-[10px] opacity-40">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
