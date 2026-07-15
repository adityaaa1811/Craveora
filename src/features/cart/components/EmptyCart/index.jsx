import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { EmptyState } from "../../../../components/ui";

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={ShoppingBag}
      title="Your Gourmet Bag is Empty"
      description="It looks like you haven't added any delicacies to your bag yet. Explore our handcrafted menu to discover something exceptional."
      actionLabel="Browse Gourmet Menu"
      onAction={() => navigate("/menu")}
    />
  );
};

export default EmptyCart;
