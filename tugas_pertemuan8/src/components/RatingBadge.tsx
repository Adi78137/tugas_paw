import { StarIcon } from './Icons'

export interface RatingBadgeProps {
  rating: number
  maxRating?: number
}

export function RatingBadge({ rating, maxRating = 5 }: RatingBadgeProps) {
  const safeRating = Math.max(0, Math.min(maxRating, Number(rating) || 0))

  return (
    <span
      className="d-inline-flex align-items-center gap-1 px-2 py-1"
      title={`Rating: ${safeRating.toFixed(1)} dari ${maxRating}`}
      style={{
        backgroundColor: 'var(--c-tint)',
        color: 'var(--c-brand-deep)',
        border: '1px solid var(--c-line)',
        borderRadius: 'var(--r-sm)',
        fontSize: '0.8125rem',
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      <StarIcon filled size={14} className="text-warning" />
      <span className="tabular-nums">{safeRating.toFixed(1)}</span>
    </span>
  )
}
