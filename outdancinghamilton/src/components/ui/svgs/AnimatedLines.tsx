import React, { useEffect, useRef } from "react";
import { slowFadeIn } from "@/src/lib/animations";
import { motion } from "framer-motion";

const strokeWidth = 12;
const width = 400;
const height = 600;

const OuterPath = `
  M 40 40
  H 360
  Q 395 40 395 75
  V 525
  Q 395 560 360 560
  H 40
  Q 5 560 5 525
  V 75
  Q 5 40 40 40
  Z
`;

const MiddlePath = `
  M 60 60
  H 340
  Q 370 60 370 90
  V 510
  Q 370 540 340 540
  H 60
  Q 30 540 30 510
  V 90
  Q 30 60 60 60
  Z
`;

const InnerPath = `
  M 80 80
  H 320
  Q 345 80 345 105
  V 495
  Q 345 520 320 520
  H 80
  Q 55 520 55 495
  V 105
  Q 55 80 80 80
  Z
`;

const AccentLine = `M 260 40 V 560`;

const AnimatedLines: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const outerRef = useRef<SVGPathElement>(null);
  const middleRef = useRef<SVGPathElement>(null);
  const innerRef = useRef<SVGPathElement>(null);
  const accentRef = useRef<SVGPathElement>(null);

  useEffect(() => {
  const paths = [outerRef.current, middleRef.current, innerRef.current, accentRef.current];

  paths.forEach((path, i) => {
    if (!path) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.opacity = "1";
    path.getBoundingClientRect(); // force layout

    path.style.transition = "stroke-dashoffset 1.8s ease-in-out";
    path.style.transitionDelay = `${i * 0.25}s`;
    path.style.strokeDashoffset = "0";
  });
}, []);



  return (
    <svg
      viewBox={`0 160 ${width} ${height}`}
      style={{ width: 600, height: 800, background: "#033f2e" }}
      // viewBox={`0 170 600 800`}
    >
      <defs>
        <clipPath id="clipInner">
          <path d={InnerPath} />
        </clipPath>
      </defs>

      {/* Outer path */}
      <path
        ref={outerRef}
        d={OuterPath}
        stroke="#ff5500"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Middle path */}
      <path
        ref={middleRef}
        d={MiddlePath}
        stroke="#fab507"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Image clipped inside inner path */}
    <motion.image
      href="/images/discoball.jpg"
      x="0"
      y="0"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      clipPath="url(#clipInner)"
      variants={slowFadeIn} // your scroll animation
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />

      {/* Inner path on top */}
      <path
        ref={innerRef}
        d={InnerPath}
        stroke="#e72cb5"  // 802780
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Vertical accent line */}
      <path
        ref={accentRef}
        d={AccentLine}
        stroke="#ff6a00"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AnimatedLines;
