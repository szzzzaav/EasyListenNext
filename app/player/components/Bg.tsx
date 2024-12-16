import { useAudioContext } from "@/hooks/useAudio";
import { twMerge } from "tailwind-merge";
import {
  useEffect,
  useRef,
  useCallback,
} from "react";
const Bg = () => {
  const { color } = useAudioContext();
  const interactiveRef =
    useRef<HTMLDivElement>(null);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);
  let className = "";
  className += color.$blue
    ? "from-[#183e6c] to-[#313d43]"
    : "";
  className += color.$io
    ? "from-indigo-600 to-orange-600"
    : "";
  className += color.$purple
    ? "from-purple-800 to-indigo-900"
    : "";
  className += color.$orange
    ? "from-[#bc3e07] to-[#7e1b0c]"
    : "";

  const move = useCallback(() => {
    curX.current +=
      (tgX.current - curX.current) *
      0.2;
    curY.current +=
      (tgY.current - curY.current) *
      0.2;
    interactiveRef.current!.style.transform = `translate(${Math.round(
      curX.current
    )}px, ${Math.round(
      curY.current
    )}px)`;
    requestAnimationFrame(move);
  }, []);
  useEffect(() => {
    const handleMouseMove = (
      e: MouseEvent
    ) => {
      tgX.current = e.clientX;
      tgY.current = e.clientY;
    };
    window.addEventListener(
      "mousemove",
      handleMouseMove
    );
    move();
    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [move]);
  return (
    <>
      <div
        className={twMerge(
          "gradient-bg absolute left-0 top-0 overflow-hidden h-[100vh] w-[100vw] bg-gradient-to-br from-indigo-600 transition-all to-orange-600 -z-50",
          className
        )}
        style={{
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="15"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
                result="goo"
              ></feColorMatrix>
              <feBlend
                in="SourceGraphic"
                in2="goo"
                mode="soft-light"
              ></feBlend>
              <feComposite
                in="SourceGraphic"
                in2="goo"
                operator="atop"
              />
            </filter>
          </defs>
        </svg>
        <div
          className="gradient-container w-full h-full"
          style={{
            filter:
              "url(#goo) blur(100px) contrast(105%)",
            backfaceVisibility:
              "hidden",
            transformStyle:
              "preserve-3d",
            mixBlendMode: "normal",
            isolation: "isolate",
            contain: "paint",
          }}
        >
          <div
            className="g1 absolute w-[80%] h-[80%] opacity-100 mix-blend-hard-light origin-center animate-[moveVertical_30s_ease_infinite]"
            style={{
              background:
                "radial-gradient(circle at center,rgb(18, 113 ,255,0.8) 0, rgb(18, 113 ,255,0) 50%) no-repeat",
              top: "calc(50% - 80% / 2)",
              left: "calc(50% - 80% / 2)",
            }}
          ></div>
          <div
            className="g2 absolute w-[80%] h-[80%] opacity-100 mix-blend-hard-light animate-[moveInCircle_20s_reverse_infinite]"
            style={{
              background:
                "radial-gradient(circle at center,rgb(221,74,255,0.8) 0, rgb(221,74,255,0) 50%) no-repeat",
              top: "calc(50% - 80% / 2)",
              left: "calc(50% - 80% / 2)",
              transformOrigin:
                "calc(50% - 400px)",
            }}
          ></div>
          <div
            className="g3 absolute w-[80%] h-[80%] opacity-100 mix-blend-hard-light animate-[moveInCircle_40s_linear_infinite]"
            style={{
              background:
                "radial-gradient(circle at center,rgb(100,220,255,0.8) 0, rgb(100,220,255,0) 50%) no-repeat",
              top: "calc(50% - 80% / 2 + 200px)",
              left: "calc(50% - 80% / 2 - 500px)",
              transformOrigin:
                "calc(50% + 400px)",
            }}
          ></div>
          <div
            className="g4 absolute w-[80%] h-[80%] opacity-100 mix-blend-hard-light animate-[moveHorizontal_40s_ease_infinite]"
            style={{
              background:
                "radial-gradient(circle at center,rgb(200,50,50,0.8) 0, rgb(180,180,50,0) 50%) no-repeat",
              top: "calc(50% - 80% / 2 + 200px)",
              left: "calc(50% - 80% / 2 - 500px)",
              transformOrigin:
                "calc(50% - 200px)",
            }}
          ></div>
          <div
            className="g5 absolute w-[150%] h-[150%] opacity-70 mix-blend-hard-light animate-[moveInCircle_20s_ease_infinite]"
            style={{
              background:
                "radial-gradient(circle at center,rgb(180,180,50,0.8) 0, rgb(180,180,50,0) 50%) no-repeat",
              top: "calc(50% - 80% / 2 + 200px)",
              left: "calc(50% - 80% / 2 - 500px)",
              transformOrigin:
                "calc(50% - 800px) calc(50% + 200px)",
            }}
          ></div>
          <div
            className="interactive absolute w-[80%] h-[80%] -left-1/2 -top-1/2 opacity-70 mix-blend-hard-light"
            ref={interactiveRef}
            style={{
              background:
                "radial-gradient(circle at center,rgb(140,100,255,0.8) 0, rgb(140,100,255,0) 50%) no-repeat",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Bg;
