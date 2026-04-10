interface KMonogramProps {
  variant?: "red" | "dark" | "gold" | "cream";
  size?: number;
  className?: string;
}

const colorMap = {
  red: { primary: "hsl(0, 78%, 42%)", secondary: "hsl(0, 78%, 42%)" },
  dark: { primary: "hsl(0, 75%, 30%)", secondary: "hsl(0, 75%, 30%)" },
  gold: { primary: "hsl(42, 70%, 58%)", secondary: "hsl(42, 70%, 58%)" },
  cream: { primary: "hsl(42, 65%, 75%)", secondary: "hsl(42, 65%, 75%)" },
};

/**
 * K'ROUSEL monogram — a stylized K that fuses a fork silhouette with carousel lines.
 * Based on the mood board's 4-color K logo variants.
 */
const KMonogram = ({ variant = "red", size = 48, className = "" }: KMonogramProps) => {
  const colors = colorMap[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main K shape — left vertical stroke */}
      <path
        d="M25 15 L25 85 Q25 90 30 90 L30 90 Q35 90 35 85 L35 58 L35 42 L35 15 Q35 10 30 10 L30 10 Q25 10 25 15Z"
        fill={colors.primary}
      />
      {/* Upper diagonal — fork tine feeling */}
      <path
        d="M35 50 L62 18 Q65 14 70 17 L70 17 Q74 20 71 24 L45 55Z"
        fill={colors.primary}
      />
      {/* Lower diagonal */}
      <path
        d="M35 50 L62 82 Q65 86 70 83 L70 83 Q74 80 71 76 L45 45Z"
        fill={colors.secondary}
      />
      {/* Fork prong accent — top */}
      <path
        d="M64 12 Q66 8 69 10 L69 10 Q72 12 70 15 L66 20 Q64 16 64 12Z"
        fill={colors.primary}
        opacity="0.7"
      />
      {/* Fork prong accent — upper mid */}
      <path
        d="M72 14 Q74 10 77 12 L77 12 Q80 14 78 17 L74 22 Q72 18 72 14Z"
        fill={colors.primary}
        opacity="0.5"
      />
    </svg>
  );
};

export default KMonogram;
