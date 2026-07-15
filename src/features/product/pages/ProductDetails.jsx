import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import Breadcrumb from "../components/Breadcrumb";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductActions from "../components/ProductActions";
import DeliveryInfo from "../components/DeliveryInfo";
import ProductTabs from "../components/ProductTabs";
import RecommendedProducts from "../components/RecommendedProducts";
import { EmptyState, Skeleton } from "../../../components/ui";

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ProductDetailsFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading, error, isWishlisted, toggleWishlist, addToCart } = useProduct(id);

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <EmptyState
          title="Gourmet Dish Not Found"
          description="We couldn't locate the item you requested. It might have been seasonal or temporarily removed."
          actionLabel="Return to Menu"
          onAction={handleBackToMenu}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="container mx-auto px-4 md:px-8 py-6 md:py-10 max-w-7xl"
    >
      {/* Back to Menu Action & Breadcrumbs */}
      <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-6">
        <button
          onClick={handleBackToMenu}
          className="inline-flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer w-fit select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gourmet Discovery</span>
        </button>
        {isLoading ? (
          <div className="h-4 bg-neutral-200 rounded w-1/4 animate-pulse mt-2" />
        ) : (
          <Breadcrumb productName={product?.title} />
        )}
      </motion.div>

      {isLoading ? (
        /* Skeletons Loading View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery Skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton variant="image" className="w-full aspect-4/3" />
            <div className="flex gap-3">
              <Skeleton width="80px" height="60px" className="rounded-xl" />
              <Skeleton width="80px" height="60px" className="rounded-xl" />
            </div>
          </div>
          {/* Info & Action Skeletons */}
          <div className="flex flex-col gap-4">
            <Skeleton width="100px" height="20px" className="rounded-full" />
            <Skeleton width="60%" height="32px" className="rounded" />
            <Skeleton width="150px" height="18px" className="rounded" />
            <Skeleton width="120px" height="28px" className="rounded" />
            <div className="flex flex-col gap-2 mt-4">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
            <div className="flex gap-4 mt-6">
              <Skeleton width="120px" height="44px" className="rounded-full" />
              <Skeleton width="200px" height="44px" className="rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        /* Fully Loaded View */
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left side: Gallery */}
            <motion.div variants={itemVariants} className="w-full">
              <ProductGallery gallery={product.gallery} title={product.title} />
            </motion.div>

            {/* Right side: Detailed Information */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 w-full">
              <ProductInfo product={product} />
              
              <ProductActions
                product={product}
                isWishlisted={isWishlisted}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />

              <DeliveryInfo deliveryInfo={product.deliveryInfo} />
            </motion.div>
          </div>

          {/* Detailed Info Sections & Tabs */}
          <motion.div variants={itemVariants} className="w-full mt-10 md:mt-16">
            <ProductTabs product={product} />
          </motion.div>

          {/* Related Pairings recommendations */}
          <motion.div variants={itemVariants} className="w-full">
            <RecommendedProducts
              category={product.category}
              currentProductId={product.id}
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ProductDetailsFeature;
