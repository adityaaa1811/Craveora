import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleWishlist as toggleWishlistAction, selectIsWishlisted } from "../../../store/slices/wishlistSlice";
import { addItem as addToCartAction } from "../../../store/slices/cartSlice";
import { productMock } from "../data/productMock";

export const useProduct = (id) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read wishlist state from Redux
  const isWishlisted = useAppSelector(selectIsWishlisted(id));

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    // Simulate luxury API fetch delay
    const timer = setTimeout(() => {
      const foundProduct = productMock[id];
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Gourmet dish not found");
      }
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  const handleToggleWishlist = () => {
    if (product) {
      dispatch(toggleWishlistAction(product));
    }
  };

  const handleAddToCart = (quantity) => {
    if (product) {
      dispatch(addToCartAction({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      }));
    }
  };

  return {
    product,
    isLoading,
    error,
    isWishlisted,
    toggleWishlist: handleToggleWishlist,
    addToCart: handleAddToCart
  };
};

export default useProduct;
