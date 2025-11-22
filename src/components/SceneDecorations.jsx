import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneDecorations({ topRef, bottomRef, isMobile = false }) {
  useLayoutEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!top || !bottom) return;


    const topStartPos = isMobile ? { x: 9, y: 8, z: -3 } : { x: 3, y: -2, z: -5 };
    const topFinalPos = isMobile ? { x: 0, y: -8, z: 4 } : { x: 0, y: -4.6, z: 6 };

    const bottomStartPos = isMobile ? {  x: -3, y: -9, z: -3 } : { x: 5, y: -2.5, z: -5 };
    const bottomFinalPos = isMobile ? { x: 1.5, y: -6, z: 4 } : { x: 1.2, y: -5.7, z: 6 };

    top.position.set(topStartPos.x, topStartPos.y, topStartPos.z);
    bottom.position.set(bottomStartPos.x, bottomStartPos.y, bottomStartPos.z);

    top.scale.set(0.1, 0.1, 0.1);
    bottom.scale.set(0.1, 0.1, 0.1);
    top.visible = false;
    bottom.visible = false;

    gsap.timeline({
      scrollTrigger: {
        trigger: ".section1",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          top.visible = true;
          bottom.visible = true;

         
          gsap.to(top.position, {
            ...topFinalPos,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
              gsap.to(top.position, {
                y: topFinalPos.y - (isMobile ? 0.15 : 0.2),
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            },
          });
          gsap.to(top.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power3.out" });

        
          gsap.to(bottom.position, {
            ...bottomFinalPos,
            duration: 1,
            ease: "power3.out",
            delay: 0.1,
            onComplete: () => {
              gsap.to(bottom.position, {
                y: bottomFinalPos.y - (isMobile ? 0.15 : 0.2),
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            },
          });
          gsap.to(bottom.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power3.out", delay: 0.1 });
        },
        onLeave: () => { top.visible = false; bottom.visible = false; },
        onLeaveBack: () => { top.visible = false; bottom.visible = false; },
      },
    });

  }, [topRef, bottomRef, isMobile]);

  return null;
}