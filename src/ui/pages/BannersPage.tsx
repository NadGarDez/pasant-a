import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { bannerTabs } from "../../constants/uiStaticItems";

export const BannersPage = (): JSX.Element => {
	return <BodyTab tabs={bannerTabs} />;
};
