// animation.ts
1;

// ========================================================
// [アウトアニメーション] 上にわずかに逃げながらフェードアウト
// ========================================================
export const outAnimation = () => {
    document.documentElement.classList.add("is-wait");
    return gsap.to("#swup", {
        opacity: 0,
        y: -220,
        ease: "power4.inOut",
        duration: 1.4,
        onStart: () => {
            gsap.set("#swup", {
                willChange: "transform",
            });
        },
    });
};

// ========================================================
// [インアニメーション] 下からわずかに上がりながらフェードイン
// ========================================================
export const inAnimation = () => {
    window.scrollTo(0, 0);

    gsap.set("#swup", {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        willChange: "transform",
    });
    gsap.set("#swup", { y: "100%" });
    return gsap.to("#swup", {
        y: "0%",
        ease: "power4.inOut",
        duration: 1.4,
        onComplete: () => {
            gsap.to("[data-hide-element]", {
                opacity: 1,
                pointerEvents: "auto",
            });
            document.documentElement.classList.remove("is-wait");
        },
    });
};
