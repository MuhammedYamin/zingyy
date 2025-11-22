import React, { useRef, useEffect } from "react";
import { SodaCan } from "./SodaCan";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FloatingCan = ({
  flavor = "blackCherry",
  scale = 2,
  isMobile = false,
}) => {
  const canRef = useRef();

  useEffect(() => {
    if (!canRef.current) return;

    const floatTimeline = gsap.timeline();

    const startY = isMobile ? -6 : -5;
    const startX = isMobile ? 2 : 2.5;
    const finalY = isMobile ? -3 : 0.2;
    const finalX = isMobile ? 2 : 3.5;

    gsap.fromTo(
      canRef.current.position,
      { y: startY, x: startX },
      { y: finalY, x: finalX, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(
      canRef.current.rotation,
      { x: 0, y: 0, z: 0 },
      {
        x: 0.05,
        y: -0.6,
        z: -0.3,
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          floatTimeline.to(canRef.current.position, {
            y: finalY - 0.4,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        },
      }
    );

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".site",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    scrollTl.to(canRef.current.position, { x: -8, y: -1 });
    scrollTl.to(
      canRef.current.rotation,
      { y: Math.PI * 1.3, x: 0.5, z: 0.2 },
      "<"
    );

    scrollTl.to(canRef.current.position, { x: 0, y: 0, duration: 1.2 });
    scrollTl.to(
      canRef.current.rotation,
      { y: -0.09, x: 0, z: 0, duration: 1.2 },
      "<"
    );

    ScrollTrigger.create({
      trigger: ".section2",
      start: "top bottom",
      onEnter: () => floatTimeline.kill(),
    });
  }, [isMobile]);

  useEffect(() => {
    if (!canRef.current) return;

    canRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = false;
      }
    });
  }, []);

  return (
    <group ref={canRef}>
      <SodaCan flavor={flavor} scale={isMobile ? scale * 0.5 : scale} />
    </group>
  );
};

export default FloatingCan;
