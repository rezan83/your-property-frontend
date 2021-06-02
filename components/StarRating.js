const Star = ({ marked }) => {
  return (
    <span className="star" role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

const StarRating = ({ value }) => {
  return (
    <>
      {Array.from({ length: value }, (v, i) => (
        <Star
          // starId={i + 1}
          key={`star_${Math.random()}`}
          marked
        />
      ))}
      {Array.from({ length: 5 - value }, (v, i) => (
        <Star
          // starId={i + 1}
          key={`star_${Math.random()}`}
          marked={false}
        />
      ))}
    </>
  );
};

export default StarRating;