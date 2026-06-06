// @ts-check
import { defineConfig } from "astro/config";
import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        swup({
            theme: false, //デフォルトで用意されている遷移アニメーションは使用しない
            smoothScrolling: false, //スムーズスクロール無効化
            updateBodyClass: true, //ページ遷移時にbody要素のクラス名を更新する
            reloadScripts: false, //遷移後にスクリプトを再読み込みさせない
        }),
    ],
});
