import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src={
              "https://res.cloudinary.com/dwdsjbetu/image/upload/v1754157546/ChatGPT_Image_Aug_2_2025_06_58_05_PM_kr7wi4.png"
            }
            alt="RN Keypad Component"
            height={50}
            width={50}
            className="rounded-full"
          />
          React Native Keypad Component
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
