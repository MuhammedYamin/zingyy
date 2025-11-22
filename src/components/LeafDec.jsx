import { useEffect, useRef} from "react";
import gsap from "gsap";
import { Leaf } from "./Leaf";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LeafDec({ isMobile = false }) {
  const topLeafRef = useRef();
  const bottomLeafRef = useRef();

  useEffect(() => {
    let checkLoaded;
    checkLoaded = requestAnimationFrame(function check() {
      const topLeaf = topLeafRef.current;
      const bottomLeaf = bottomLeafRef.current;
      if (!topLeaf || !bottomLeaf) {
        checkLoaded = requestAnimationFrame(check);
        return;
      }
      cancelAnimationFrame(checkLoaded);

      const topStartPos = isMobile ? { x: 2, y: -1, z: -3 } : { x: 3, y: -2, z: -5 };
      const topFinalPos = isMobile ? { x: 4, y: -5, z: 1 } : { x: 5.5, y: 2.2, z: 2 };

      const bottomStartPos = isMobile ? { x: 3, y: -1.5, z: -3 } : { x: 5, y: -2.5, z: -5 };
      const bottomFinalPos = isMobile ? { x: 2, y: -2, z: 1 } : { x: 2.5, y: -2.7, z: 2 };

      topLeaf.position.set(topStartPos.x, topStartPos.y, topStartPos.z);
      bottomLeaf.position.set(bottomStartPos.x, bottomStartPos.y, bottomStartPos.z);

      topLeaf.scale.set(0.1, 0.1, 0.1);
      bottomLeaf.scale.set(0.1, 0.1, 0.1);

      topLeaf.visible = false;
      bottomLeaf.visible = false;

      gsap.timeline({
        scrollTrigger: {
          trigger: ".section1",
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            topLeaf.visible = true;
            bottomLeaf.visible = true;

            gsap.to(topLeaf.position, {
              ...topFinalPos,
              duration: 1,
              ease: "power3.out",
              onComplete: () => {
                gsap.to(topLeaf.position, {
                  y: topFinalPos.y - (isMobile ? 0.25 : 0.4),
                  duration: 3,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                });
              },
            });
            gsap.to(topLeaf.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power3.out" });

            gsap.to(bottomLeaf.position, {
              ...bottomFinalPos,
              duration: 1,
              ease: "power3.out",
              delay: 0.1,
              onComplete: () => {
                gsap.to(bottomLeaf.position, {
                  y: bottomFinalPos.y - (isMobile ? 0.25 : 0.4),
                  duration: 3,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                });
              },
            });
            gsap.to(bottomLeaf.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power3.out", delay: 0.1 });
          },
          onLeave: () => { topLeaf.visible = false; bottomLeaf.visible = false; },
          onLeaveBack: () => { topLeaf.visible = false; bottomLeaf.visible = false; },
        },
      });
    });

    return () => cancelAnimationFrame(checkLoaded);
  }, [isMobile]);

  return (
    <>
      <Leaf ref={topLeafRef} scale={1.2} />
      <Leaf ref={bottomLeafRef} scale={1.2} />
    </>
  );
}
