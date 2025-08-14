const Droplet = ({ id, style }) => {
  return (
    <>
      <svg
        id={id}
        style={style}
        width="3"
        height="300"
        viewBox="0 0 3 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 rounded-full"
      >
        <defs>
          {/* Gradient fill */}
          <linearGradient id="whiteToBlack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>

          {/* White glow filter */}
          <filter id="whiteGlow" x="-200%" y="-200%" width="500%" height="500%">
            {/* <!-- Take shape alpha --> */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            {/* <!-- Color it white --> */}
            <feFlood floodColor="white" floodOpacity="1" result="white" />
            <feComposite in="white" in2="blur" operator="in" result="glow" />
            {/* <!-- Merge glow with original shape --> */}
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M0 1 A1.5 1.5 0 0 1 3 1 L1.5 300 Z"
          fill="url(#whiteToBlack)"
          filter="url(#whiteGlow)"
        />
      </svg>
    </>
  );
};

export default Droplet;
