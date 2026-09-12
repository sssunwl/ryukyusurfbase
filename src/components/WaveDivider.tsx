export function WaveDivider({ flip = false, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`wave-divider ${flip ? 'wave-divider--flip' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
        <path d="M0 45c176 39 329 43 475 12 147-31 285-35 431-2 145 32 323 30 534-8v49H0Z" />
        <path className="wave-divider__line" d="M0 28c167 31 329 34 486 8 158-26 296-24 451 5 155 29 322 24 503-13" />
      </svg>
    </div>
  )
}
