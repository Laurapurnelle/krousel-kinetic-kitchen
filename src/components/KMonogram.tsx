interface KMonogramProps {
  variant?: "gold" | "cream" | "red" | "dark";
  size?: number;
  className?: string;
  showCircle?: boolean;
}

const colorMap = {
  gold: { stroke: "hsl(42, 70%, 58%)", fill: "hsl(42, 70%, 58%)" },
  cream: { stroke: "hsl(42, 65%, 80%)", fill: "hsl(42, 65%, 80%)" },
  red: { stroke: "hsl(0, 78%, 42%)", fill: "hsl(0, 78%, 42%)" },
  dark: { stroke: "hsl(0, 50%, 22%)", fill: "hsl(0, 50%, 22%)" },
};

/**
 * K'ROUSEL monogram — a K fused with a fork, inside an optional circle.
 * Based on the burger box branding: gold on dark bordeaux.
 */
const KMonogram = ({ variant = "gold", size = 48, className = "", showCircle = true }: KMonogramProps) => {
  const c = colorMap[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Optional circle border */}
      {showCircle && (
        <circle cx="50" cy="50" r="46" stroke={c.stroke} strokeWidth="2" fill="none" />
      )}

      {/* Fork handle — vertical line (left part of K) */}
      <line x1="38" y1="22" x2="38" y2="78" stroke={c.fill} strokeWidth="4" strokeLinecap="round" />

      {/* Fork tines (top of the vertical) */}
      <line x1="33" y1="22" x2="33" y2="34" stroke={c.fill} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="22" x2="38" y2="34" stroke={c.fill} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="22" x2="43" y2="34" stroke={c.fill} strokeWidth="2.5" strokeLinecap="round" />

      {/* Fork bridge connecting tines */}
      <path d="M33 34 Q38 38 43 34" stroke={c.fill} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* K upper diagonal arm */}
      <line x1="42" y1="50" x2="62" y2="28" stroke={c.fill} strokeWidth="4" strokeLinecap="round" />

      {/* K lower diagonal leg */}
      <line x1="42" y1="50" x2="62" y2="72" stroke={c.fill} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export default KMonogram;
