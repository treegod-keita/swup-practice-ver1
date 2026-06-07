// swup.ts
import Swup from "swup";
import SwupBodyClassPlugin from "@swup/body-class-plugin";
import { outAnimation, inAnimation } from "@/scripts/modules/animation";

const swup = new Swup({
    containers: ["#swup"], // Swupが差し替えるDOMの範囲
    animationSelector: false, // CSSアニメーションの完了待機を無効化
    animateHistoryBrowsing: true, // ブラウザの戻る・進むボタンを押したときもアニメーションを実行
    plugins: [new SwupBodyClassPlugin()], // ページ遷移時に <body> のクラスを新しいページのものに自動で更新
});

swup.hooks.replace("animation:out:await", async () => {
    await outAnimation();
});

swup.hooks.replace("animation:in:await", async () => {
    await inAnimation();
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
