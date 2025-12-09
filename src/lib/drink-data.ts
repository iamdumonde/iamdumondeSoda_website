
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
    subtitle: "Soda Classique",
    description: "Une version moderne d'un cola classique, avec un équilibre parfait entre douceur et acidité, pleine de saveurs nostalgiques.",
    imageSequence: generateImageSequence(
      "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda/frame_0001.webp",
      FRAME_COUNT
    ),
  },
  {
    id: "iamcoco",
    name: "IamCoco",
    subtitle: "Soda à la Crème",
    description: "Un délice doux et crémeux, ce soda offre une texture veloutée avec des notes de vanille et de caramel pour une expérience vraiment décadente.",
    imageSequence: generateImageSequence(
      "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda2/frame_0001.webp",
      FRAME_COUNT
    ),
  },
  {
    id: "iambenco",
    name: "IamBenco",
    subtitle: "Soda au Gingembre",
    description: "Un soda aux agrumes vif et zesté, débordant de saveur naturelle de citron-lime et de bulles vives pour une finale nette et vivifiante.",
    imageSequence: generateImageSequence(
      "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda3/frame_0001.webp",
      FRAME_COUNT
    ),
  },
];
