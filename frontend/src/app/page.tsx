import { FeatureSection } from "@/components/custom/FeatureSection";
import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
        feature: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.dir(strapiData, { depth: null });

  const { title, description, blocks } = strapiData;

  return (
    <main>
      <HeroSection data={blocks[0]} />

      <FeatureSection data={blocks[1]} />
    </main>
  );
}
