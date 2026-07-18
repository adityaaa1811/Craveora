import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  ArrowLeft, 
  MapPin, 
  Download, 
  RotateCcw,
  CheckCircle,
  Truck,
  Sparkles,
  CookingPot
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectOrderById } from "../store/slices/ordersSlice";
import { addItem } from "../store/slices/cartSlice";
import { Card, Button } from "../components/ui";

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const order = useAppSelector(selectOrderById(id));

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const handleInvoiceDownload = () => {
    toast.success("Preparing digital invoice for download...", {
      icon: "📥"
    });
  };

  const handleReorder = () => {
    if (!order) return;
    
    // Add all items from this order to the cart
    order.items.forEach((item) => {
      dispatch(addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      }));
    });
    
    toast.success("Items added to your bag!");
    navigate("/cart");
  };

  if (!order) {
    return (
      <div className="text-center py-16 flex flex-col items-center gap-3">
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
          Order Not Discovered
        </h3>
        <p className="text-xs text-text-muted">
          The requested order identifier is invalid or does not match our databases.
        </p>
        <Link to="/dashboard/orders">
          <Button variant="outline" size="sm" className="mt-4 gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </Button>
        </Link>
      </div>
    );
  }

  // Helper timeline indicators
  const timelineIcons = [CheckCircle, CookingPot, Truck, Sparkles];

  const getStatusStep = (status) => {
    switch (status) {
      case "Order Placed":
        return 0;
      case "Preparing":
        return 1;
      case "In Transit":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 3;
    }
  };

  const activeStepIndex = getStatusStep(order.status);

  return (
    <div className="flex flex-col gap-8">
      {/* Header coordinates */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/30 pb-4 select-none">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/orders" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <ArrowLeft className="w-4 h-4 text-text-secondary" />
          </Link>
          <div>
            <h3 className="text-xs text-text-muted font-bold uppercase tracking-wider">
              Gourmet Order Details
            </h3>
            <h2 className="text-sm font-black text-text-primary font-mono mt-1">
              {order.id}
            </h2>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleInvoiceDownload} 
            variant="outline" 
            size="sm"
            className="h-9 px-4 text-[10px] gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>INVOICE</span>
          </Button>
          
          <Button 
            onClick={handleReorder} 
            size="sm"
            className="h-9 px-4 text-[10px] gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REORDER</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left columns: Timeline & items lists */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Order Handover Timeline */}
          <Card className="p-6 border border-border/30 bg-surface shadow-sm">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider mb-6 border-b border-border-light pb-3">
              Delivery Milestones
            </h4>

            <div className="flex flex-col gap-8 relative pl-10 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-light">
              {order.timeline.map((step, idx) => {
                const isCompleted = idx <= activeStepIndex && order.status !== "Cancelled";
                const isCancelled = order.status === "Cancelled" && step.label === "Cancelled";
                const IconComponent = timelineIcons[idx] || CheckCircle;

                return (
                  <div key={idx} className="relative flex gap-4 items-start">
                    {/* Circle badge timeline */}
                    <div className={`absolute -left-12 w-8 h-8 rounded-full flex items-center justify-center border transition-all z-10 ${
                      isCompleted 
                        ? "bg-primary border-primary text-white scale-110 shadow-sm" 
                        : isCancelled 
                        ? "bg-error border-error text-white scale-110 shadow-sm" 
                        : "bg-surface border-border text-text-muted"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-black ${
                          isCompleted ? "text-primary" : isCancelled ? "text-error" : "text-text-secondary"
                        }`}>
                          {step.label}
                        </span>
                        {step.time && (
                          <span className="text-[10px] text-text-muted font-mono font-bold">
                            {step.time}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-text-secondary leading-normal mt-1 max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Ordered Gourmet Selections */}
          <Card className="p-6 border border-border/30 bg-surface shadow-sm">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider mb-4 border-b border-border-light pb-3">
              Gourmet Selections
            </h4>

            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4 py-2 border-b border-border-light last:border-b-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-12 h-12 rounded-xl object-cover bg-neutral-100 border border-border-light shrink-0" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-text-primary truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-text-muted mt-1">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0 font-mono text-xs">
                    <span className="text-text-secondary font-bold">x {item.quantity}</span>
                    <span className="font-black text-text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column: Delivery coordinates & Payment details */}
        <div className="flex flex-col gap-8">
          
          {/* Handover Coordinates */}
          <Card className="p-6 border border-border/30 bg-surface shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider border-b border-border-light pb-3">
              Delivery Coordinates
            </h4>

            <div className="flex gap-3">
              <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-black text-text-primary">
                  {order.deliveryAddress.name}
                </span>
                <span className="text-xs text-text-secondary leading-relaxed font-medium mt-1">
                  {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}, {order.deliveryAddress.country}
                </span>
                <span className="text-[10px] text-text-muted mt-1 font-mono font-bold">
                  {order.deliveryAddress.phone}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Receipt summary */}
          <Card className="p-6 border border-border/30 bg-surface shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider border-b border-border-light pb-3">
              Receipt Summary
            </h4>

            <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-text-primary">{formatPrice(order.paymentSummary.subtotal)}</span>
              </div>

              {order.paymentSummary.discount > 0 && (
                <div className="flex justify-between text-success-hover font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(order.paymentSummary.discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-text-primary">
                  {order.paymentSummary.deliveryFee === 0 ? "Complimentary" : formatPrice(order.paymentSummary.deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Taxes & Duties (8%)</span>
                <span className="font-bold text-text-primary">{formatPrice(order.paymentSummary.tax)}</span>
              </div>

              <hr className="border-t border-border-light my-1" />

              <div className="flex justify-between text-sm text-text-primary font-black">
                <span>Grand Total</span>
                <span className="text-primary font-bold">{formatPrice(order.paymentSummary.grandTotal)}</span>
              </div>

              <div className="flex justify-between text-[10px] text-text-muted mt-2 border-t border-border-light/80 pt-3.5">
                <span>Payment Mode</span>
                <span className="font-mono font-bold uppercase">{order.paymentSummary.paymentMethod}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
