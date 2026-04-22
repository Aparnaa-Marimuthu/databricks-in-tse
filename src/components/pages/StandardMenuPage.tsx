"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../Layout";
import { getCanonicalHomeMenuId } from "../../utils/menuRouting";
import DatabricksDashboardPage from "./DatabricksDashboardPage";
import DatabricksGeniePage from "./DatabricksGeniePage";
import HomePage from "./HomePage";
import SpotterPage from "./SpotterPage";

interface StandardMenuPageProps {
  menuId: string;
}

export default function StandardMenuPage({ menuId }: StandardMenuPageProps) {
  const router = useRouter();
  const { standardMenus, appConfig } = useAppContext();
  const menu = standardMenus.find((item) => item.id === menuId);
  const canonicalHomeMenuId = getCanonicalHomeMenuId(standardMenus);
  const shouldRedirectToHome =
    canonicalHomeMenuId === menuId && canonicalHomeMenuId !== "home";

  useEffect(() => {
    if (shouldRedirectToHome) {
      router.replace("/");
    }
  }, [router, shouldRedirectToHome]);

  if (shouldRedirectToHome) {
    return <HomePage />;
  }

  if (!menu) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#718096",
          fontSize: "14px",
        }}
      >
        This menu could not be found.
      </div>
    );
  }

  if (appConfig.provider === "databricks") {
    if (menu.providerContentType === "dashboard") {
      return <DatabricksDashboardPage />;
    }

    if (menu.providerContentType === "genie") {
      return <DatabricksGeniePage />;
    }
  }

  if (
    menu.homePageType === "html" ||
    menu.homePageType === "iframe" ||
    menu.homePageType === "image" ||
    menu.homePageType === "liveboard" ||
    menu.homePageType === "answer" ||
    !!menu.homePageValue
  ) {
    return <HomePage menuId={menu.id} />;
  }

  if (
    menu.homePageType === "spotter" ||
    menu.spotterModelId ||
    menu.spotterSearchQuery
  ) {
    return (
      <SpotterPage
        spotterModelId={menu.spotterModelId}
        spotterSearchQuery={menu.spotterSearchQuery}
      />
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#718096",
        fontSize: "14px",
      }}
    >
      This standard menu type is not available on a direct route yet.
    </div>
  );
}
