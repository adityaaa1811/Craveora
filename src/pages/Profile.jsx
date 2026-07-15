import React, { useState } from "react";
import { User, Heart, Clock, LogOut, Check, ShoppingBag, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectWishlistItems, toggleWishlist } from "../store/slices/wishlistSlice";
import { addItem as addToCart } from "../store/slices/cartSlice";
import { Avatar, Button, Card, Badge } from "../components/ui";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);
  const [activeTab, setActiveTab] = useState("details");

  // Mock User details
  const [userInfo, setUserInfo] = useState({
    name: "Aditya Mishra",
    email: "aditya.mishra@craveora.com",
    phone: "+1 (800) 555-0199",
    tier: "Connoisseur Club"
  });

  // Mock Orders History
  const pastOrders = [
    {
      id: "ORD-9874",
      date: "July 12, 2026",
      status: "Delivered",
      items: "Truffle Ribeye Steak x 1, Botanical Citrus Juice x 2",
      total: 82.50
    },
    {
      id: "ORD-9762",
      date: "June 28, 2026",
      status: "Delivered",
      items: "Lobster Thermidor x 1, Classic Lemonade x 1",
      total: 62.00
    }
  ];

  const handleSaveDetails = (e) => {
    e.preventDefault();
    toast.success("Account details saved successfully.");
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(toggleWishlist(item));
    toast.success(`Moved ${item.title} to your bag!`);
  };

  const handleRemoveWish = (item) => {
    dispatch(toggleWishlist(item));
    toast.success("Removed from wishlist.");
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Avatar Panel */}
        <Card className="p-6 lg:col-span-1 border border-border/30 bg-surface shadow-md flex flex-col items-center text-center gap-4">
          <Avatar name={userInfo.name} size="lg" />
          <div>
            <h2 className="text-base font-extrabold text-text-primary leading-tight">
              {userInfo.name}
            </h2>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block mt-1">
              {userInfo.email}
            </span>
          </div>
          <Badge variant="primary" className="mt-1">
            {userInfo.tier}
          </Badge>
          <hr className="w-full border-t border-border-light/60 my-2" />
          <button
            onClick={() => toast.success("Logout simulated.")}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full hover:bg-neutral-50 text-xs font-bold text-text-secondary hover:text-error transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </Card>

        {/* Right Side: Modules Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Tab selectors */}
          <div className="flex border-b border-border-light/80 overflow-x-auto no-scrollbar gap-2">
            {[
              { id: "details", label: "Account Details", icon: User },
              { id: "wishlist", label: `Wishlist (${wishlistItems.length})`, icon: Heart },
              { id: "orders", label: "Past Orders", icon: Clock }
            ].map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-5 text-xs md:text-sm font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-primary"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Module Content */}
          <div className="min-h-[300px]">
            {activeTab === "details" && (
              <Card className="p-6 border border-border/30 bg-surface shadow-sm">
                <form onSubmit={handleSaveDetails} className="flex flex-col gap-4">
                  <h3 className="text-sm font-extrabold text-text-primary tracking-tight pb-2 border-b border-border-light/80">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-text-secondary pl-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-text-secondary pl-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-secondary pl-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      disabled
                      className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-neutral-50 text-text-muted cursor-not-allowed"
                    />
                  </div>
                  <Button type="submit" className="w-fit px-6 mt-2 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                </form>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <div className="flex flex-col gap-4">
                {wishlistItems.length === 0 ? (
                  <Card className="p-12 text-center flex flex-col items-center gap-3 bg-surface border border-border/30 rounded-2xl">
                    <Heart className="w-10 h-10 text-neutral-300 stroke-[1.5]" />
                    <p className="text-xs font-bold text-text-secondary">Your wishlist is empty</p>
                    <p className="text-[10px] text-text-muted leading-normal max-w-xs">
                      Explore our menu catalog and hit the heart icon to save delicacies here.
                    </p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <Card
                        key={item.id}
                        className="p-4 border border-border/30 bg-surface shadow-2xs flex gap-4 items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover bg-neutral-100 border border-border-light"
                        />
                        <div className="flex-grow min-w-0 flex flex-col gap-0.5">
                          <h4 className="text-xs font-bold text-text-primary truncate">
                            {item.title}
                          </h4>
                          <span className="text-xs font-extrabold text-primary">
                            {formatPrice(item.price)}
                          </span>
                          <div className="flex gap-2 mt-2">
                            <Button
                              onClick={() => handleMoveToCart(item)}
                              size="sm"
                              className="h-7 px-3 text-[10px] gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add to Bag</span>
                            </Button>
                            <Button
                              onClick={() => handleRemoveWish(item)}
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 text-[10px]"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="flex flex-col gap-4">
                {pastOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="p-5 border border-border/30 bg-surface shadow-2xs flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-text-primary">{order.id}</span>
                        <Badge variant="success" className="h-5 flex items-center text-[9px]">
                          {order.status}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-text-muted">{order.date}</span>
                      <p className="text-xs text-text-secondary leading-normal mt-1 max-w-md">
                        {order.items}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end justify-between shrink-0">
                      <span className="text-sm font-extrabold text-primary">
                        {formatPrice(order.total)}
                      </span>
                      <button
                        onClick={() => toast.success(`Viewing invoice for ${order.id}`)}
                        className="mt-2 text-2xs font-bold text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Invoice</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
