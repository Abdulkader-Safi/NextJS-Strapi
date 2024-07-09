import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
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
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseURL = "http://localhost:1337";

  const url = new URL(path, baseURL);
  url.search = homePageQuery;
  console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();

    const flattenedData = flattenAttributes(data);
    console.dir(flattenedData, { depth: null });

    return flattenedData;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData);

  const { title, description, blocks } = strapiData;

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
