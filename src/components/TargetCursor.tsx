"use client";

import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";

export type TargetCursorProps = {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
};

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  // Detect touch/mobile devices and disable custom cursor for them
  const [isTouch, setIsTouch] = useState(true); // default true to avoid flash on mobile

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mql.matches || window.innerWidth < 1024);
    update();
    mql.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<Element> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  // Reusable tween setters to avoid creating new tweens per mousemove
  const quickX = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const quickY = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  const moveCursor = useCallback((x: number, y: number) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (quickX.current && quickY.current) {
      quickX.current(x);
      quickY.current(y);
    } else {
      gsap.to(cursor, {
        x,
        y,
        duration: 0.1,
        ease: "power3.out",
      });
    }
  }, []);

  useEffect(() => {
    if (isTouch || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (!isTouch && hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");

    // Initialize quickTo setters once
    quickX.current = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    quickY.current = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

    let activeTarget: Element | null = null;
    let currentTargetMove: EventListener | null = null;
    let currentLeaveHandler: EventListener | null = null;
    let isAnimatingToTarget = false;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: Element) => {
      const el = target as HTMLElement;
      if (currentTargetMove) {
        el.removeEventListener("mousemove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        el.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    // Helper to toggle custom/native cursor visibility
    const showCustomCursor = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.opacity = "1";
      if (hideDefaultCursor) document.body.style.cursor = 'none';
    };
    const hideCustomCursor = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.opacity = "0";
      // Restore default cursor
      document.body.style.cursor = '';
    };

    // Capture pointer entering/leaving iframes or declared native-cursor areas
    const nativeEnter = (e: Event) => {
      const target = e.target as Element | null;
      if (!target) return;
      const isIframe = target instanceof HTMLIFrameElement;
      const isNativeArea = !!(target.closest && target.closest("[data-cursor='native']"));
      if (isIframe || isNativeArea) hideCustomCursor();
    };
    const nativeLeave = (e: Event) => {
      const target = e.target as Element | null;
      if (!target) return;
      const isIframe = target instanceof HTMLIFrameElement;
      const isNativeArea = !!(target.closest && target.closest("[data-cursor='native']"));
      if (isIframe || isNativeArea) showCustomCursor();
    };
    window.addEventListener('mouseover', nativeEnter, true);
    window.addEventListener('mouseout', nativeLeave, true);

    let mouseRaf: number | null = null;
    const moveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (mouseRaf) return;
      mouseRaf = requestAnimationFrame(() => {
        moveCursor(clientX, clientY);

        // Detect when hovering over iframes (or explicit native-cursor areas)
        // Iframes do not propagate mouse events to the parent document, so the
        // custom cursor can appear to "stick" at the last position. When hovering
        // an iframe, hide the custom cursor and restore the native cursor.
        const el = document.elementFromPoint(clientX, clientY);
        const isIframe = el instanceof HTMLIFrameElement;
        const isNativeArea = !!(el && (el as Element).closest && (el as Element).closest("[data-cursor='native']"));

        if (isIframe || isNativeArea) {
          hideCustomCursor();
        } else {
          showCustomCursor();
        }
        mouseRaf = null;
      });
    };
    window.addEventListener("mousemove", moveHandler, { passive: true } as AddEventListenerOptions);

    let scrollRaf: number | undefined;
    const scrollHandler = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        if (!activeTarget || !cursorRef.current) {
          scrollRaf = undefined;
          return;
        }

        const mouseX = Number(gsap.getProperty(cursorRef.current, "x"));
        const mouseY = Number(gsap.getProperty(cursorRef.current, "y"));

        const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
        const isStillOverTarget = elementUnderMouse && (
          elementUnderMouse === activeTarget ||
          (elementUnderMouse.closest && elementUnderMouse.closest(targetSelector) === activeTarget)
        );

        if (!isStillOverTarget) {
          if (currentLeaveHandler) {
            currentLeaveHandler(new Event('mouseleave'));
          }
        }
        scrollRaf = undefined;
      });
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Mouse press feedback
    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element;

      const allTargets: Element[] = [];
      let current: Element | null = directTarget;
      while (current && current !== document.body) {
        if ((current as Element).matches && (current as Element).matches(targetSelector)) {
          allTargets.push(current);
        }
        current = (current as HTMLElement).parentElement;
      }

      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === target) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current!.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        const tlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        };
        const trOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        };
        const brOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };
        const blOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner as HTMLElement,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle: number | null = null;
      const targetMove: EventListener = (ev) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev as MouseEvent;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler: EventListener = () => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner as HTMLElement,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = Number(
              gsap.getProperty(cursorRef.current, "rotation")
            );
            const normalizedRotation = currentRotation % 360;

            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      const el = target as HTMLElement;
      el.addEventListener("mousemove", targetMove);
      el.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler as EventListener, { passive: true } as AddEventListenerOptions);

    return () => {
      window.removeEventListener("mousemove", moveHandler as EventListener);
      window.removeEventListener("mouseover", enterHandler as EventListener);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener('mouseover', nativeEnter, true);
      window.removeEventListener('mouseout', nativeLeave, true);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
      if (scrollRaf !== undefined) cancelAnimationFrame(scrollRaf);
      quickX.current = null;
      quickY.current = null;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isTouch]);

  useEffect(() => {
    if (isTouch || !cursorRef.current || !spinTl.current) return;

    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration, isTouch]);

  return (
    // Do not render on touch/mobile devices
    isTouch ? null : (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
    </div>
    )
  );
};

export default TargetCursor;
