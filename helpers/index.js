export const isPlural = (ifPlural) => ifPlural > 1 && "s";

export const avgRate = (reviews) => {
  let avgRate = 0;

  for (const review of reviews) {
    avgRate += review.rate;
  }
  return Math.floor(avgRate / reviews.length);
};
