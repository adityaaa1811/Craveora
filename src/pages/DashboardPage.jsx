import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  ArrowRight,
  Eye
} from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";
import { selectAddresses, selectDefaultAddress } from "../store/slices/profileSlice";
import { selectOrders } from "../store/slices/ordersSlice";
import { selectWishlistItems } from "../store/slices/wishlistSlice";
import { Card, Button, Badge } from "../components/ui";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const addresses = useAppSelector(selectAddresses);
  const defaultAddress = useAppSelector(selectDefaultAddress);
  const orders = useAppSelector(selectOrders);
  const wishlistItems = useAppSelector(selectWishlistItems);

  // Mock Recently Viewed items matching actual menu items
  const recentlyViewed = [
    {
      id: "p3",
      title: "Gold Leaf Opera Cake",
      price: 24.50,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=300"
    },
    {
      id: "p6",
      title: "Botanical Hibiscus Brew",
      price: 9.50,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=300"
    }
  ];

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

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Card */}
      <Card className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-r from-primary to-primary-hover text-white border-none shadow-lg">
        {/* Decorative subtle circles */}
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary select-none">
              Welcome back
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              {currentUser?.name || "Aditya Mishra"}
            </h2>
            <p className="text-xs text-white/80 leading-normal max-w-md mt-1">
              Your gourmet account credentials are active. Indulge in standard-defining culinary selections from our executive chef studios.
            </p>
          </div>
          <Link to="/menu">
            <Button className="bg-white hover:bg-neutral-100 text-primary border-none shadow-md px-6 text-xs tracking-wider">
              <span>ORDER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Gourmet Orders", value: orders.length, icon: ShoppingBag, path: "/dashboard/orders" },
          { label: "Wishlist Items", value: wishlistItems.length, icon: Heart, path: "/dashboard/wishlist" },
          { label: "Saved Addresses", value: addresses.length, icon: MapPin, path: "/dashboard/addresses" },
          { label: "Default Address", value: defaultAddress ? `${defaultAddress.city}, ${defaultAddress.state}` : "None Set", icon: MapPin, path: "/dashboard/addresses" }
        ].map((stat, idx) => (
          <Card 
            key={idx} 
            onClick={() => navigate(stat.path)}
            className="p-5 border border-border/30 bg-surface shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0">
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-base font-black text-text-primary mt-1 block truncate">
                {stat.value}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Primary Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Recent Orders Overview */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-text-primary uppercase tracking-wider pl-1">
              Recent Gourmet Orders
            </h3>
            <Link to="/dashboard/orders" className="text-2xs font-extrabold text-primary hover:underline">
              View History
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {orders.length === 0 ? (
              <Card className="p-8 text-center flex flex-col items-center justify-center gap-2.5 bg-surface border border-border/20">
                <ShoppingBag className="w-8 h-8 text-neutral-300 stroke-[1.5]" />
                <p className="text-xs text-text-secondary font-bold">No orders placed yet</p>
              </Card>
            ) : (
              orders.slice(0, 2).map((order) => (
                <Card 
                  key={order.id} 
                  onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                  className="p-5 border border-border/30 bg-surface shadow-2xs hover:shadow-sm cursor-pointer transition-all flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-text-primary font-mono">{order.id}</span>
                    <Badge variant={getStatusColor(order.status)} className="h-5 text-[9px] flex items-center">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">{order.items.length} delicacy items</span>
                    <span className="font-extrabold text-primary">{formatPrice(order.amount)}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Saved Coordinates Overview */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-text-primary uppercase tracking-wider pl-1">
              Default Coordinates
            </h3>
            <Link to="/dashboard/addresses" className="text-2xs font-extrabold text-primary hover:underline">
              Manage Addresses
            </Link>
          </div>

          {defaultAddress ? (
            <Card className="p-5 border border-border/30 bg-surface shadow-2xs flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-text-primary">{defaultAddress.name}</span>
                  <Badge variant="primary" className="h-4 flex items-center text-[8px] tracking-widest">
                    DEFAULT
                  </Badge>
                </div>
                <span className="text-xs text-text-secondary truncate mt-1">
                  {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
                </span>
                <span className="text-[10px] text-text-muted">{defaultAddress.phone}</span>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center flex flex-col items-center justify-center gap-2.5 bg-surface border border-border/20">
              <MapPin className="w-8 h-8 text-neutral-300 stroke-[1.5]" />
              <p className="text-xs text-text-secondary font-bold">No saved addresses</p>
            </Card>
          )}
        </div>
      </div>

      {/* Recently Viewed (Cross-Sells) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider pl-1">
          Recently Viewed Delicacies
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentlyViewed.map((item) => (
            <Card 
              key={item.id} 
              onClick={() => navigate(`/menu/${item.id}`)}
              className="p-4 border border-border/30 bg-surface shadow-2xs hover:shadow-sm cursor-pointer transition-all flex gap-4 items-center"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-16 h-16 rounded-xl object-cover bg-neutral-100 border border-border-light shrink-0" 
              />
              <div className="flex-grow min-w-0 flex flex-col gap-0.5">
                <h4 className="text-xs font-bold text-text-primary truncate">
                  {item.title}
                </h4>
                <span className="text-xs font-extrabold text-primary">
                  {formatPrice(item.price)}
                </span>
                <div className="flex items-center gap-1.5 text-[9px] text-text-muted mt-1 select-none">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
