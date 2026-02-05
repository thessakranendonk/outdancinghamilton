const width = 1800;
const height = 250;
const midY = height / 2;
const amplitude = 30;
const wavelength = 360;

function generatePath(yOffset: number) {
  let d = `M 0 ${midY + yOffset}`;
  for (let x = 0; x <= width; x += 10) {
    const y =
      midY +
      yOffset +
      amplitude * Math.sin((2 * Math.PI * x) / wavelength);
    d += ` L ${x} ${y}`;
  }
  return d;
}

const colors = [
  "#fab507",
  "#ff5500",
  "#da43b2",
  "#6a097e",
  "#2E6F6B",
];

const paths = colors.map((_, i) => generatePath(i * 18));

export default function Divider() {
  return (
    <svg
      viewBox={`0 80 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: "auto", overflow: "hidden" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            .wave {
              animation: bounce 4s ease-in-out infinite;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
          `}
        </style>
      </defs>

      {colors.map((color, i) => (
        <path
          key={color}
          d={paths[i]}
          fill="none"
          stroke={color}
          strokeWidth={14}
          className="wave"
        />
      ))}
    </svg>
  );
}
