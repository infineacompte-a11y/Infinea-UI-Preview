import React from "react";

/**
 * InFinea Brand Logo — SVG inline component.
 * Renders the hourglass + swirl mark with brand gradients.
 *
 * Usage:
 *   <InFineaLogo size={32} />
 *   <InFineaLogo size={48} withText />
 *   <InFineaLogo size={24} variant="light" />
 */
export default function InFineaLogo({ size = 32, withText = false, variant = "default", className = "" }) {
  const textColor = variant === "light" ? "#0E0F0F" : "#F2F2F2";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id={`infinea-bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#275255" />
            <stop offset="100%" stopColor="#459492" />
          </linearGradient>
          <linearGradient id={`infinea-swirl-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55B3AE" />
            <stop offset="100%" stopColor="#5DB786" />
          </linearGradient>
        </defs>

        {/* Background rounded square */}
        <rect width="48" height="48" rx="12" fill={`url(#infinea-bg-${size})`} />

        {/* Hourglass mark */}
        <g transform="translate(24, 24)">
          {/* Top half */}
          <path d="M-8,-14 L8,-14 L2,-2 L-2,-2 Z" fill="white" opacity="0.95" />
          {/* Bottom half */}
          <path d="M-2,2 L2,2 L8,14 L-8,14 Z" fill="white" opacity="0.85" />
          {/* Center */}
          <circle cx="0" cy="0" r="1.5" fill="white" />
          {/* Swirl arc top */}
          <path
            d="M-12,-9 A16,16 0 0,1 12,-9"
            fill="none"
            stroke={`url(#infinea-swirl-${size})`}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Coral accent arc bottom */}
          <path
            d="M12,9 A16,16 0 0,1 -12,9"
            fill="none"
            stroke="#E48C75"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>
      </svg>

      {withText && (
        <span
          className="font-heading font-semibold tracking-tight"
          style={{
            fontSize: size * 0.6,
            color: textColor,
          }}
        >
          InFinea
        </span>
      )}
    </div>
  );
}
