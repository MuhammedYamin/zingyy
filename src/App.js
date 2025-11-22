import "./App.css";
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  Suspense,
  useRef,
} from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import FloatingCan from "./components/FloatingCan";
import { Environment } from "@react-three/drei";
import SceneDecorations from "./components/SceneDecorations";
import { Cherry } from "./components/Cherry";
import LeafDec from "./components/LeafDec";

const App = () => {
  const [isWhite, setIsWhite] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const cherryTopRef = useRef();
  const cherryBottomRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const section3 = document.getElementById("section3");
    if (!section3) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsWhite(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(section3);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.boundingClientRect.top < 0) {
            setIsBlurred(true);
          } else if (window.scrollY === 0) {
            setIsBlurred(false);
          }
        });
      },
      { threshold: [0] }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from([".header", ".menu li", ".contact-btn"], {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0,
      });

      gsap.from(".left-txt", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setIsBlurred(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="site">
      <Canvas
        shadows
        camera={{ position: [0, 0, isMobile ? 18 : 12], fov: 50 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          castShadow
          position={[5, 8, 10]}
          intensity={2.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <pointLight position={[-5, 5, 5]} intensity={2.5} />

        <Environment preset="city" environmentIntensity={0.9} />

        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 5]} />
          <shadowMaterial opacity={0.25} />
        </mesh>

        <Suspense fallback={null}>
          <FloatingCan scale={7.5} isMobile={isMobile} />
        </Suspense>

        <Suspense fallback={null}>
          <group>
            <Cherry
              ref={cherryTopRef}
              position={[-0.1, -12, 0.2]}
              scale={1.6}
            />
            <Cherry
              ref={cherryBottomRef}
              position={[5.5, -6.8, 0.2]}
              scale={1.6}
            />
          </group>
        </Suspense>

        <Suspense fallback={null}>
          <LeafDec isMobile={isMobile} />
        </Suspense>

        <SceneDecorations
          topRef={cherryTopRef}
          bottomRef={cherryBottomRef}
          isMobile={isMobile}
        />
      </Canvas>

      <header
        className={`header ${isWhite ? "white" : ""} ${
          isBlurred ? "header-blur" : ""
        }`}
       
      >
        <div className="left">
          <img
            src={isWhite ? "/logowhite.png" : "/logo.png"}
            alt="Logo"
            className="logo"
            onClick={() => window.location.reload()}
          />
        </div>

        <nav className="center">
          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            <li
            onClick={() =>{
              document.getElementById("section1").scrollIntoView({
                behavior: "smooth"
              })
            }}
            >Home</li>
            <li>Flavours</li>
            <li>Story</li>
            <li>Shop All</li>

            <li className="mobile-contact">
              <button className="contact-btn-mobile">Contact Us</button>
            </li>
          </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        </div>

        <div className="right">
          <button className="contact-btn desktop-contact">Contact Us</button>
        </div>
      </header>

      <section className="section section1" id="section1">
        <div className="left-txt">
          <h1>
            Pop Open Refreshment,
            <br />
            Taste the Spark of Life
          </h1>
          <button
            className="explore-btn"
            onClick={() =>
              document.getElementById("section2").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Explore Now
          </button>
        </div>
      </section>

      <section className="section section2" id="section2">
        <div className="right-txt">
          <h2 className="right-txt-title">CITRUS ZEST</h2>
          <h3 className="right-txt-second-title">Refreshing & Bright</h3>

          <p className="right-txt-para">
            Lively citrus notes keep your taste buds smiling.
            <br />A burst of sunshine in every fizzy sip.
          </p>
        </div>
      </section>

      <div className="smiley-wrapper">
        <svg
          viewBox="0 0 300 300"
          className="circle-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="circlePath"
              d="
                    M 150,150
                    m -120,0
                    a 120,120 0 1,1 240,0
                    a 120,120 0 1,1 -240,0
                  "
            />
          </defs>

          <text
            fill={isWhite ? "#ffffff" : "#BE1E2D"}
            fontSize="22"
            fontFamily="Lemonada"
            letterSpacing="4"
          >
            <textPath href="#circlePath" startOffset="0%">
              DRINK ZINGYY · STAY HAPPY · DRINK ZINGYY ·
            </textPath>
          </text>
        </svg>

        <img
          src={isWhite ? "/smiley-white.png" : "/smiley.png"}
          alt="smile"
          className="smiley-img"
        />
      </div>

      <div className="wave-divider">
        <img src="/wave.svg" alt="wave" />
      </div>

      <section
        className="section section3"
        id="section3"
        style={{ position: "relative" }}
      >
        <div
          className="can-background-circle"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            backgroundColor: "#ffdde1",
            zIndex: 0,
          }}
        ></div>

        <div className="left3" style={{ zIndex: 1 }}>
          <h2>
            New <br /> Flavour
          </h2>
        </div>

        <div className="right3" style={{ zIndex: 1 }}>
          <h1>
            Cherry <br /> Bliss
          </h1>
        </div>
      </section>
    </div>
  );
};

export default App;
