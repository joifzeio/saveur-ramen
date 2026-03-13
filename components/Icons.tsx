// Inline SVG icon components — no external dependencies

export function InstagramIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#efe7d2" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="#efe7d2" strokeWidth="1.5" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#efe7d2"/>
    </svg>
  );
}

export function ArrowIcon({ className = "w-[14px] h-[14px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7" stroke="#efe7d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7H17V17" stroke="#efe7d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function StarIcon({ className = "w-[16px] h-[16px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#efe7d2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  );
}

export function LeafIcon({ className = "w-[14px] h-[14px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 22C2 22 8 22 12 18C16 14 17 6 22 2C22 2 14 2 10 6C6 10 2 22 2 22Z"
        fill="#4ade80"
        stroke="#4ade80"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 18C9 15 6 12 2 22" stroke="#166534" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

// RoundedCorner: a purely CSS-based trick using a box-shadow clipping trick
// Renders a quarter-circle that "clips" the corner of an absolute-positioned element.
export function RoundedCorner({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0a0b0a" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 0 Q0 0 0 24 L0 0 Z" fill="#0a0b0a"/>
    </svg>
  );
}
