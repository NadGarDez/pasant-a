import React from "react";
import { MapsTableTab } from "../tabs/MapsTableTab";
import { SortMapsTab } from "../tabs/SortMapsTab";
import { SectionsTableTab } from "../tabs/SectionsTableTab";
import { SortSectionsTab } from "../tabs/SortSectionsTab";
import { VideoTableTab } from "../tabs/VideoTableTab";
import { SortVideoTab } from "../tabs/SortVideoTab";
import { BannersTableTab } from "../tabs/BannesTableTab";
import { InterstitialTab } from "../tabs/InterstitialTab";
import { SortBannersTab } from "../tabs/SortBannersTab";

const registeredTabs: Record<string, () => JSX.Element> = {
	mapsTable: MapsTableTab,
	sortMaps: SortMapsTab,
	sectionsTable: SectionsTableTab,
	sortSections: SortSectionsTab,
	videosTable: VideoTableTab,
	sortVideos: SortVideoTab,
	bannersTable: BannersTableTab,
	sortBanners: SortBannersTab,
	intestitial: InterstitialTab,
};

interface props {
	name: string;
}

export const TabSelector = ({ name }: props): JSX.Element => {
	const Tab = registeredTabs[name] ?? <></>;
	return <Tab />;
};
