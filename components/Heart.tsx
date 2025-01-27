import HeartIcon from "@/assets/svgs/heart.svg";
import HeartGrayIcon from "@/assets/svgs/heart-gray.svg";

const sizes = {
    small: 20,
    big: 40
}

export type TextProps = {
   favorite?: boolean;
   size?: keyof typeof sizes;
};

export const Heart = ({favorite = false, size = 'small'}: TextProps) => {
    return(
        favorite ? (
            <HeartIcon width={sizes[size]} height={sizes[size]}/>
        ) : (
            <HeartGrayIcon width={sizes[size]} height={sizes[size]}/>
        )
    )
}