import React from "react";

/**
 * InFinea Brand Logo — SVG inline component.
 * Faithful reproduction of the brand logo: circular swirl (teal/green/coral)
 * with hourglass mark and optional slow rotation animation.
 *
 * Usage:
 *   <InFineaLogo size={32} />
 *   <InFineaLogo size={48} withText />
 *   <InFineaLogo size={24} variant="light" />
 *   <InFineaLogo size={64} animate />
 */
export default function InFineaLogo({ size = 32, withText = false, variant = "default", className = "", animate = false }) {
  const uid = React.useId().replace(/:/g, "");

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id={`${uid}-teal`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#459492" />
            <stop offset="100%" stopColor="#55B3AE" />
          </linearGradient>
          <linearGradient id={`${uid}-green`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DB786" />
            <stop offset="100%" stopColor="#55B3AE" />
          </linearGradient>
          <linearGradient id={`${uid}-coral`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E48C75" />
            <stop offset="100%" stopColor="#C4806E" />
          </linearGradient>
        </defs>

        {/* Swirl arcs — 3 crescents forming the circular logo */}
        <g transform="translate(50,50)">
          <g>
            {animate && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="30s"
                repeatCount="indefinite"
              />
            )}

            {/* Teal crescent — top-right arc */}
            <path
              d="M 36,-21 A 42,42 0 0,1 -21,36 C -18,32 -16,28 -15,25 A 30,30 0 0,0 25,-15 C 28,-16 32,-18 36,-21 Z"
              fill={`url(#${uid}-teal)`}
              opacity="0.92"
            />

            {/* Green crescent — left arc (rotated 120 deg) */}
            <path
              d="M 36,-21 A 42,42 0 0,1 -21,36 C -18,32 -16,28 -15,25 A 30,30 0 0,0 25,-15 C 28,-16 32,-18 36,-21 Z"
              fill={`url(#${uid}-green)`}
              opacity="0.88"
              transform="rotate(120)"
            />

            {/* Coral crescent — bottom arc (rotated 240 deg) */}
            <path
              d="M 36,-21 A 42,42 0 0,1 -21,36 C -18,32 -16,28 -15,25 A 30,30 0 0,0 25,-15 C 28,-16 32,-18 36,-21 Z"
              fill={`url(#${uid}-coral)`}
              opacity="0.78"
              transform="rotate(240)"
            />
          </g>
        </g>

        {/* Hourglass — centered, smooth curves */}
        <g transform="translate(50, 50)">
          {/* Top bulb */}
          <path
            d="M -11,-24 C -11,-20 -4,-5 0,-2 C 4,-5 11,-20 11,-24 C 11,-27 6,-28 0,-28 C -6,-28 -11,-27 -11,-24 Z"
            fill="white"
            opacity="0.95"
          />
          {/* Bottom bulb */}
          <path
            d="M 0,2 C -4,5 -11,20 -11,24 C -11,27 -6,28 0,28 C 6,28 11,27 11,24 C 11,20 4,5 0,2 Z"
            fill="white"
            opacity="0.90"
          />
          {/* Center pinch */}
          <circle cx="0" cy="0" r="2.5" fill="white" opacity="0.95" />
        </g>
      </svg>

      {withText && (
        <span
          className="font-heading font-bold tracking-tight"
          style={{
            fontSize: size * 0.55,
            background: variant === "light"
              ? "#275255"
              : "linear-gradient(135deg, #459492, #55B3AE, #5DB786)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          InFinea
        </span>
      )}
    </div>
  );
}
