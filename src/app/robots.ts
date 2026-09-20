import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// GitLab Pages 등 정적 호스트 배포(output: "export")에는 요청 시점 렌더링이
// 없으므로, 빌드 시점에 한 번만 생성하도록 명시해야 한다.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
