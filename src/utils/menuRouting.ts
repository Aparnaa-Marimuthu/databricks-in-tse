import { StandardMenu } from "../types/thoughtspot";

const STANDARD_MENU_ROUTE_MAP: Record<string, string> = {
  home: "/",
  dashboard: "/dashboard",
  favorites: "/favorites",
  "my-reports": "/my-reports",
  spotter: "/spotter",
  search: "/search",
  "full-app": "/full-app",
  "all-content": "/all-content",
};

export const getStandardMenuRoute = (menu: StandardMenu): string => {
  const canonicalRoute = STANDARD_MENU_ROUTE_MAP[menu.id];
  if (canonicalRoute) {
    return canonicalRoute;
  }

  if (
    menu.homePageType === "html" ||
    menu.homePageType === "iframe" ||
    menu.homePageType === "image" ||
    menu.homePageType === "liveboard" ||
    menu.homePageType === "answer" ||
    !!menu.homePageValue ||
    menu.homePageType === "spotter" ||
    !!menu.spotterModelId ||
    !!menu.spotterSearchQuery ||
    menu.providerContentType === "genie" ||
    menu.providerContentType === "dashboard"
  ) {
    return `/menu/${menu.id}`;
  }

  return "/";
};
