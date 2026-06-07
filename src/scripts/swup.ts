// swup.ts
import Swup from "swup";
import SwupBodyClassPlugin from "@swup/body-class-plugin";
import { gsap } from "gsap";
import SwupParallelPlugin from "@swup/parallel-plugin";

const swup = new Swup({
    containers: ["#swup"], // Swupが差し替えるDOMの範囲
    animationSelector: false, // CSSアニメーションの完了待機を無効化
    animateHistoryBrowsing: true, // ブラウザの戻る・進むボタンを押したときもアニメーションを実行
    plugins: [new SwupBodyClassPlugin(), new SwupParallelPlugin()], // ページ遷移時に <body> のクラスを新しいページのものに自動で更新
});

swup.hooks.replace("animation:in:await", async (visit) => {
    const previous = document.querySelector(".is-previous-container") as HTMLElement;
    const next = document.querySelector("#swup:not(.is-previous-container)") as HTMLElement;

    const scrollY = window.scrollY;
    gsap.set(previous, { position: "absolute", top: scrollY, left: 0, width: "100%", zIndex: 0 });
    gsap.set(next, { position: "absolute", top: 0, left: 0, width: "100%", y: "100%", zIndex: 1 });

    await Promise.all([
        gsap.fromTo(
            previous,
            { filter: "brightness(1)" },
            { y: -200, filter: "brightness(0.3)", duration: 1.4, ease: "power4.inOut" },
        ),
        gsap.to(next, { y: "0%", duration: 1.4, ease: "power4.inOut" }),
    ]);

    gsap.set(next, { position: "", top: "", left: "", width: "", y: "", zIndex: "" });
    window.scrollTo(0, 0); // アニメーション完了後にリセット
});

swup.hooks.replace("content:scroll", () => {
    return false;
    // Swupの自動スクロールリセットを無効化
});

// // Astro用スクリプト再実行処理
swup.hooks.on("content:replace", () => {
    document.querySelectorAll("#swup script").forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
            newScript.setAttribute(attr.name, attr.value),
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
});

export default swup;
