import { DemiToolbarConfig } from "demiurge";
import { RouteLabelES, RoutePath } from "@enum/route.enum";
import packageJson from "../../../package.json";
import { Assets } from "@enum/assets.enum";

export const TOOLBAR_CONFIG: DemiToolbarConfig = {
  title: packageJson.name,
  toggleTitle: packageJson.name,
  defaultProfileImgPath: Assets.DefaultProfileImgPath,
  defaultTitle: "Anónimo",
  items: [
    {
      label: RouteLabelES.Home,
      url: RoutePath.Home,
      icon: "bi-house",
      toggleable: true,
      activeButtons: ["toggle", "search"],
    },
    {
      label: RouteLabelES.Search,
      url: RoutePath.Search,
      icon: "bi-search",
      toggleable: true,
      activeButtons: ["back", "search"],
    },
    {
      label: RouteLabelES.Community,
      url: RoutePath.Community,
      icon: "bi-people",
      toggleable: true,
      activeButtons: ["back"],
    },
    {
      label: RouteLabelES.About,
      url: RoutePath.About,
      icon: "bi-info-circle",
      toggleable: true,
      activeButtons: ["back"],
    },
    {
      label: RouteLabelES.Config,
      url: RoutePath.Config,
      icon: "bi-gear",
      toggleable: true,
      activeButtons: ["back"],
    },
    {
      label: RouteLabelES.Reader,
      url: RoutePath.Reader,
      activeButtons: ["back"],
      hidden: true,
    },
  ],
};
