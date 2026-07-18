import React, { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Star, ThumbsUp, Edit, Trash2, Camera, Plus } from "lucide-react";
import { Button, Avatar, Modal, Rating } from "../../../../components/ui";

export const Reviews = ({ reviews: initialReviews = [], rating: _initialRating = 0, reviewCount: _initialCount = 0 }) => {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  
  // Helpful votes state tracks which reviews the user has clicked
  const [helpfulClicked, setHelpfulClicked] = useState({});

  // Review Form States
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  // Recalculate average rating & counts dynamically
  const { averageRating, totalCount, distribution } = useMemo(() => {
    if (reviewsList.length === 0) {
      return { averageRating: 0, totalCount: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    
    let sum = 0;
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    reviewsList.forEach((rev) => {
      sum += rev.rating;
      const roundedStar = Math.round(rev.rating);
      if (dist[roundedStar] !== undefined) {
        dist[roundedStar]++;
      }
    });

    const avg = Math.round((sum / reviewsList.length) * 10) / 10;
    return {
      averageRating: avg,
      totalCount: reviewsList.length,
      distribution: dist
    };
  }, [reviewsList]);

  // Mock Review Photos
  const reviewPhotos = [
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=150"
  ];

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormName("");
    setFormRating(5);
    setFormComment("");
    setIsOpen(true);
  };

  const handleOpenEdit = (review) => {
    setEditingReview(review);
    setFormName(review.userName);
    setFormRating(review.rating);
    setFormComment(review.comment);
    setIsOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      toast.error("Please fill in name and review comment.");
      return;
    }

    if (editingReview) {
      // Edit existing review
      setReviewsList((prev) =>
        prev.map((r) =>
          r.id === editingReview.id
            ? { ...r, userName: formName, rating: formRating, comment: formComment }
            : r
        )
      );
      toast.success("Review modified successfully.");
    } else {
      // Create new review
      const newReview = {
        id: `r-${Date.now()}`,
        userName: formName,
        rating: formRating,
        comment: formComment,
        date: new Date().toISOString().split("T")[0],
        helpful: 0
      };
      setReviewsList((prev) => [newReview, ...prev]);
      toast.success("Review posted successfully!");
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviewsList((prev) => prev.filter((r) => r.id !== id));
      toast.success("Review removed.");
    }
  };

  const handleHelpfulClick = (id) => {
    if (helpfulClicked[id]) {
      toast.error("You have already voted this review as helpful.");
      return;
    }
    setHelpfulClicked((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r
      )
    );
    toast.success("Thank you for your feedback!");
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      
      {/* Summary Stats & Distribution Breakdown */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl border border-border/30 bg-surface shadow-sm">
        
        {/* Rating Average */}
        <div className="flex flex-col items-center justify-center text-center shrink-0">
          <span className="text-5xl font-black text-text-primary">
            {averageRating}
          </span>
          <div className="mt-2.5 flex items-center justify-center">
            {/* Direct Star rating rendering */}
            <Rating rating={averageRating} />
          </div>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-3">
            Based on {totalCount} reviews
          </span>
        </div>

        {/* Bars distribution */}
        <div className="flex-grow flex flex-col gap-2.5 w-full">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] || 0;
            const percentVal = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
            const percentWidth = `${percentVal}%`;

            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-3 font-semibold text-text-secondary">{star}</span>
                <div className="flex-grow h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: percentWidth }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-text-muted font-mono">{percentVal}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Food Photos Gallery */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
          Review Photos
        </span>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {reviewPhotos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`Review attachment ${i}`}
              className="w-16 h-16 rounded-xl object-cover border border-border-light cursor-pointer hover:opacity-90 transition-opacity shrink-0"
              onClick={() => toast.success("Opening gallery modal...")}
            />
          ))}
          <div className="w-16 h-16 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-text-muted cursor-pointer hover:bg-neutral-50 shrink-0">
            <Camera className="w-4.5 h-4.5 stroke-[1.5]" />
            <span className="text-[8px] font-black uppercase mt-1">Upload</span>
          </div>
        </div>
      </div>

      {/* Reviews List Header & Add review */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pl-1">
          <h4 className="text-sm font-black text-text-primary uppercase tracking-wider">
            Customer Reviews ({totalCount})
          </h4>
          <Button 
            onClick={handleOpenAdd} 
            size="sm" 
            className="h-9 px-4 text-[10px] gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>WRITE REVIEW</span>
          </Button>
        </div>

        {reviewsList.length === 0 ? (
          <p className="text-xs text-text-muted italic pl-1">
            No customer reviews yet. Be the first to leave a review!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviewsList.map((review) => (
              <article
                key={review.id}
                className="flex flex-col gap-3.5 p-5 rounded-2xl border border-border/30 bg-surface shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.userName} size="sm" />
                    <div>
                      <h5 className="text-xs font-bold text-text-primary leading-none">
                        {review.userName}
                      </h5>
                      <span className="text-[9px] text-text-muted mt-1 inline-block font-mono">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Rating rating={review.rating} />
                    
                    {/* Edit/Delete actions */}
                    <div className="flex items-center border-l border-border-light pl-3.5 gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(review)}
                        className="p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
                        title="Edit Review"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(review.id)}
                        className="p-1 text-text-muted hover:text-error transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-text-secondary leading-relaxed pl-1">
                  {review.comment}
                </p>

                {/* Helpful button */}
                <div className="flex items-center justify-end pl-1 pt-1 border-t border-border-light/60">
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(review.id)}
                    className={`flex items-center gap-1.5 text-2xs font-extrabold transition-colors cursor-pointer py-1 px-2.5 rounded-full ${
                      helpfulClicked[review.id]
                        ? "bg-primary-light text-primary"
                        : "text-text-secondary hover:bg-neutral-50 hover:text-primary"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({review.helpful || 0})</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Write/Edit Review Modal Dialog */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
          <div className="pb-2 border-b border-border-light/80">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight">
              {editingReview ? "Modify Review" : "Compose Review"}
            </h3>
            <p className="text-[10px] text-text-muted mt-1 leading-normal">
              Share your dining feedback to guide other Connoisseurs.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Rating Stars selector */}
            <div className="flex flex-col gap-1.5 pl-0.5">
              <span className="text-2xs font-extrabold text-text-secondary">
                Overall Rating
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-1 cursor-pointer focus:outline-none hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5.5 h-5.5 ${
                        star <= formRating
                          ? "fill-current text-amber-500"
                          : "text-neutral-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* User Name input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rev-name" className="text-2xs font-extrabold text-text-secondary">
                Your Name
              </label>
              <input
                id="rev-name"
                type="text"
                placeholder="e.g. John Doe"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-border rounded-xl bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-text-muted"
                required
              />
            </div>

            {/* Comment Area */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rev-comment" className="text-2xs font-extrabold text-text-secondary">
                Review Comments
              </label>
              <textarea
                id="rev-comment"
                rows="4"
                placeholder="How did the flavor notes hit? Sourdough toast crispy?"
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-border rounded-xl bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-text-muted resize-none leading-relaxed"
                required
              />
            </div>

            {/* Mock Photo Uploader */}
            <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-neutral-50">
              <Camera className="w-5 h-5 text-text-muted" />
              <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider">
                Attach food pictures
              </span>
              <span className="text-[8px] text-text-muted">
                Accepts JPEG, PNG up to 5MB
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-4 select-none">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 h-9 text-[10px]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-5 py-2 h-9 text-[10px]"
            >
              Publish Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Reviews;
