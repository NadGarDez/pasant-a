import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { sectionTabs } from "../../constants/uiStaticItems";

export const SectionsPage = (): JSX.Element => {
	return <BodyTab tabs={sectionTabs} />;
};
