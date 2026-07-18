import React, { useMemo } from "react";
import { toast } from "react-hot-toast";
import { Plus, ShoppingBag } from "lucide-react";
import { products } from "../../../menu/data/products";
import { useAppDispatch } from "../../../../store/hooks";
import { addItem } from "../../../../store/slices/cartSlice";
import { Card, Button } from "../../../../components/ui";

export const FrequentlyBoughtTogether = ({ currentProduct }) => {
  const dispatch = useAppDispatch();

  // Find 2 bundle matches from different categories
  const bundleItems = useMemo(() => {
    if (!currentProduct) return [];
    
    // Select one beverage and one dessert, or starter/main depending on category
    const matches = [];
    
    if (currentProduct.category === "mains") {
      // Mains -> Pair with a starter (e.g. p1) and a beverage (e.g. p8)
      const starter = products.find(p => p.category === "starters" && p.id !== currentProduct.id);
      const drink = products.find(p => p.category === "beverages" && p.id !== currentProduct.id);
      if (starter) matches.push(starter);
      if (drink) matches.push(drink);
    } else if (currentProduct.category === "starters") {
      // Starters -> Pair with a main (e.g. p5) and a beverage (e.g. p10)
      const main = products.find(p => p.category === "mains" && p.id !== currentProduct.id);
      const drink = products.find(p => p.category === "beverages" && p.id !== currentProduct.id);
      if (main) matches.push(main);
      if (drink) matches.push(drink);
    } else {
      // Specials/Desserts/Beverages -> Pair with a main (e.g. p2) and a starter (e.g. p11)
      const main = products.find(p => p.category === "mains" && p.id !== currentProduct.id);
      const starter = products.find(p => p.category === "starters" && p.id !== currentProduct.id);
      if (main) matches.push(main);
      if (starter) matches.push(starter);
    }
    
    return matches;
  }, [currentProduct]);

  // Pricing calculations
  const { originalTotal, bundleTotal, discountAmount } = useMemo(() => {
    if (!currentProduct || bundleItems.length === 0) return { originalTotal: 0, bundleTotal: 0, discountAmount: 0 };
    
    const sum = currentProduct.price + bundleItems.reduce((acc, item) => acc + item.price, 0);
    const discounted = Math.round(sum * 0.9 * 100) / 100; // 10% bundle discount
    return {
      originalTotal: sum,
      bundleTotal: discounted,
      discountAmount: Math.round((sum - discounted) * 100) / 100
    };
  }, [currentProduct, bundleItems]);

  const handleAddBundle = () => {
    if (!currentProduct || bundleItems.length === 0) return;
    
    // Add current item
    dispatch(addItem({
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: 1
    }));
    
    // Add bundle items
    bundleItems.forEach((item) => {
      dispatch(addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1
      }));
    });
    
    toast.success(`Pairing Bundle added to your bag! 10% discount applies.`, {
      icon: "🎉"
    });
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  if (bundleItems.length < 2) return null;

  return (
    <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-sm mt-12 select-none">
      <div>
        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary-light px-3.5 py-1 rounded-full">
          Curated Pairings
        </span>
        <h3 className="text-lg md:text-xl font-black text-text-primary tracking-tight mt-3">
          Frequently Bought Together
        </h3>
        <p className="text-xs text-text-muted mt-1 leading-normal">
          Chef recommends matching these delicate flavor selections to construct a standard-setting culinary flight.
        </p>
      </div>

      {/* Product items loop */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-6 pt-6 border-t border-border-light/80">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-grow w-full lg:w-auto justify-center">
          
          {/* Main item */}
          <div className="flex items-center gap-3 w-full sm:w-[220px]">
            <img 
              src={currentProduct.image} 
              alt={currentProduct.title} 
              className="w-14 h-14 rounded-xl object-cover border border-border-light shrink-0" 
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-text-primary truncate">{currentProduct.title}</h5>
              <span className="text-xs font-extrabold text-primary font-mono">{formatPrice(currentProduct.price)}</span>
            </div>
          </div>

          <Plus className="w-4.5 h-4.5 text-text-muted shrink-0 rotate-0" />

          {/* Bundle Item 1 */}
          <div className="flex items-center gap-3 w-full sm:w-[220px]">
            <img 
              src={bundleItems[0].image} 
              alt={bundleItems[0].title} 
              className="w-14 h-14 rounded-xl object-cover border border-border-light shrink-0" 
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-text-primary truncate">{bundleItems[0].title}</h5>
              <span className="text-xs font-extrabold text-primary font-mono">{formatPrice(bundleItems[0].price)}</span>
            </div>
          </div>

          <Plus className="w-4.5 h-4.5 text-text-muted shrink-0" />

          {/* Bundle Item 2 */}
          <div className="flex items-center gap-3 w-full sm:w-[220px]">
            <img 
              src={bundleItems[1].image} 
              alt={bundleItems[1].title} 
              className="w-14 h-14 rounded-xl object-cover border border-border-light shrink-0" 
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-text-primary truncate">{bundleItems[1].title}</h5>
              <span className="text-xs font-extrabold text-primary font-mono">{formatPrice(bundleItems[1].price)}</span>
            </div>
          </div>

        </div>

        {/* Pricing Summary Box */}
        <div className="bg-neutral-50 border border-border-light/80 p-5 rounded-2xl flex flex-col items-center sm:items-end justify-center w-full lg:w-60 text-center sm:text-right shrink-0">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
            Total Bundle Price
          </span>
          <div className="flex items-baseline gap-2 mt-1 justify-center sm:justify-end">
            <span className="text-xs text-text-muted line-through font-mono">
              {formatPrice(originalTotal)}
            </span>
            <span className="text-base font-black text-primary font-mono">
              {formatPrice(bundleTotal)}
            </span>
          </div>
          <span className="text-[9px] text-success-hover font-bold uppercase tracking-wider block mt-0.5">
            Save {formatPrice(discountAmount)} (10% OFF Bundle)
          </span>
          <Button 
            onClick={handleAddBundle} 
            size="sm" 
            className="w-full mt-4 h-9 text-[10px] gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD BUNDLE</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FrequentlyBoughtTogether;
