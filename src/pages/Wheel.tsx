import { useRef, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import WheelImg from "../assets/images/wheel.png";
// import Logo from "../components/Logo";
// import { MainTitle } from "../components/MainTitle";

export function SpinningWheel() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning || !wheelRef.current) return;
    
    setIsSpinning(true);
    
    // Reset animation
    const wheel = wheelRef.current;
    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(${currentRotation % 360}deg)`;
    // Force reflow
    void wheel.offsetWidth;
    
    // Apply spin (4 full rotations + random angle)
    const newRotation = currentRotation + 1440 + Math.floor(Math.random() * 360);
    setCurrentRotation(newRotation);
    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${newRotation}deg)`;
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <main className="gap-4 sm:gap-12 px-8 py-12 justify-between">
      {/* <div className="flex flex-col items-center gap-8"> */}
        <Logo size="large" />
        <div className="wheel-container relative aspect-square">
          <div className="wheel w-full h-full relative" ref={wheelRef}>
            <img src={WheelImg} />
            {/* {[...Array(16)].map((_, i) => (
              <div 
                key={i}
                className="wheel-item absolute w-1/2 h-1/2"
                style={{ 
                  '--i': i + 1,
                  transform: `rotate(${(360 / 16) * i}deg)`,
                  transformOrigin: 'bottom right'
                } as React.CSSProperties}
              >
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  Option {i + 1}
                </span>
              </div>
            ))} */}

          </div>
          <div className="pointer"></div>
        </div>
        <div className="flex flex-col w-full gap-y-4">
        <ActionButton
          onClick={handleSpin}
          text={isSpinning ? "Girando..." : "Girar"}
          className={isSpinning ? "opacity-70 cursor-not-allowed" : ""}
          disabled={isSpinning}
        />
        
        <ActionButton
          // onClick={handleSpin}
          url="/"
          text="Volver"
          className="bg-transparent text-white"
        />

        </div>
      {/* </div> */}
    </main>
  );
}