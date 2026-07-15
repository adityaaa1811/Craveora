import React from "react";
import { Rating, Avatar } from "../../../../components/ui";

export const Reviews = ({ reviews = [], rating = 0, reviewCount = 0 }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Reviews Summary Block */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-border/40 bg-surface shadow-2xs">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-4xl md:text-5xl font-black text-text-primary">
            {rating}
          </span>
          <Rating rating={rating} className="mt-1" />
          <span className="text-2xs font-bold text-text-muted uppercase tracking-wider mt-2">
            {reviewCount} Reviews
          </span>
        </div>

        <div className="flex-grow flex flex-col gap-2 w-full">
          {/* Simple mock rating bars distribution */}
          {[5, 4, 3, 2, 1].map((star) => {
            const countPercent = star === 5 ? "85%" : star === 4 ? "12%" : "3%";
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-3 font-semibold text-text-secondary">{star}</span>
                <div className="flex-grow h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: countPercent }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-text-muted">{countPercent}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-bold text-text-primary">
          Customer Reviews
        </h4>
        {reviews.length === 0 ? (
          <p className="text-xs text-text-muted italic">
            No customer reviews yet. Be the first to leave a review!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-border/30 bg-surface shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.userName} size="sm" />
                    <div>
                      <h5 className="text-xs font-bold text-text-primary leading-none">
                        {review.userName}
                      </h5>
                      <span className="text-[10px] text-text-muted mt-1 inline-block">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <Rating rating={review.rating} />
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed pl-1">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
