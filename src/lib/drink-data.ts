
import type { DrinkVariant } from "./types";

const FRAME_COUNT = 240; // Number of images in the sequence

/**
 * Generates a sequence of image URLs for the parallax animation.
 * The base URL should contain a placeholder like 'frame_0001'
 * which will be replaced with the correct frame number.
 * @param baseUrl - The base URL for the image sequence.
 * @param frameCount - The number of frames (images) to generate.
 * @returns An array of image URLs.
 */
const generateImageSequence = (baseUrl: string, frameCount: number): string[] => {
  return Array.from({ length: frameCount }, (_, i) => {
    const frameNumber = String(i + 1).padStart(4, "0");
    // This assumes the URL has a placeholder like 'frame_0001'
    return baseUrl.replace('frame_0001', `frame_${frameNumber}`);
  });
};

export const DRINK_VARIANTS: DrinkVariant[] = [
  {
    id: "cocobenco",
    name: "CocoBenco",
    subtitle: "Classic Soda",
    description: "A modern take on a classic cola, with a perfect balance of sweet and tangy, full of nostalgic flavors.",
    imageSequence: generateImageSequence(
      "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda/frame_0001.webp",
      FRAME_COUNT
    ),
  },
  {
    id: "iamcoco",
    name: "IamCoco",
    subtitle: "Cream Soda",
    description: "A smooth and creamy delight, this soda offers a velvety texture with hints of vanilla and caramel for a truly decadent experience.",
    imageSequence: generateImageSequence(
      "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda2/frame_0001.webp",
      FRAME_COUNT
    ),
  },
  {
    id: "iambenco",
    name: "IamBenco",
    subtitle: "Ginger Ale",
    description: "A bright and zesty citrus soda, bursting with natural lemon-lime flavor and crisp bubbles for a clean, invigorating finish.",
    imageSequence: generateImageSequence(
      "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda3/frame_0001.webp",
      FRAME_COUNT
    ),
  },
];

    