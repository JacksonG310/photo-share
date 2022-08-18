/*
    动态指定rem值，最大为40ox
    根据用户屏幕宽度进行计算
*/

export const useRem = () => {
    const MAX_FONT_SIZE = 40;
    document.addEventListener('DOMContentLoaded', () => {
        const html = document.querySelector('html');
        // 屏幕宽度 / 10
        // 将屏幕宽度分为10份，1rem占1份
        let fontSize = window.innerWidth / 10;
        fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
        html.style.fontSize = fontSize + 'px';
    })
}