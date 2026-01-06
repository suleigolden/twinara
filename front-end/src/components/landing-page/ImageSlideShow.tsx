import { forwardRef, ImageProps } from '@chakra-ui/react';
import { ImageWatermark } from './ImageWatermark';
import { useEffect, useState } from 'react';
import { CustomCardProps } from '../../theme/theme';
import heroImage0 from "../../assets/landing-page/hero-image.png";
import heroImage1 from "../../assets/landing-page/hero-image-1.png";
import heroImage2 from "../../assets/landing-page/hero-image-2.png";
import heroImage3 from "../../assets/landing-page/hero-image-3.png";
import heroImage4 from "../../assets/landing-page/hero-image-4.png";


const images = [
  heroImage0,
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
];
type ImageWatermarkProps = ImageProps & CustomCardProps & {
  type?: 'landing-page' | 'about-page';
};
export const ImageSlideShow = forwardRef<ImageWatermarkProps, 'image'>(
  (props, ref) => {
    const { size, variant, ...rest } = props;
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(timer);
    }, []);

    return (
    <ImageWatermark
      src={images[currentImage]}
      alt="About Us Image"
      type={props.type}
      {...rest}
  />
    );
  },
);
