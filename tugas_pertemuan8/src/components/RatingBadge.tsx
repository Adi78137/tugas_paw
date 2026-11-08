export interface RatingBadgeProps {
  rating: number
  maxRating?: number
}

export function RatingBadge({ rating, maxRating = 5 }: RatingBadgeProps) {
  const safeRating = Math.max(0, Math.min(maxRating, Number(rating) || 0))

  return (
    <span
      className="badge bg-warning text-dark d-inline-flex align-items-center gap-1"
      title={`Rating: ${safeRating.toFixed(1)} dari ${maxRating}`}
    >
      <span aria-hidden="true">&#9733;</span>
      <span className="fw-semibold">{safeRating.toFixed(1)}</span>
    </span>
  )
}

export const RatingStars = RatingBadge

