// animation.ts
import { gsap } from "gsap";

// ========================================================
// [アウトアニメーション] 上にわずかに逃げながらフェードアウト
// ========================================================
export const outAnimation = () => {
    return gsap.to("#swup", {
        y: -24,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
    });
};

// ========================================================
// [インアニメーション] 下からわずかに上がりながらフェードイン
// ========================================================
export const inAnimation = () => {
    window.scrollTo(0, 0);

    return gsap.fromTo(
        "#swup",
        {
            y: 32,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
        },
    );
};
