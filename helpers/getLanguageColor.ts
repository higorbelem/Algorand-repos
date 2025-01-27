import { githubColors } from "@/constants/githubColors"

export const getLanguageColor = (language: string): string => {
    const randomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

    if(Object.keys(githubColors).includes(language)) return githubColors[language].color || randomColor;

    return randomColor;
}