import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { mapTabs } from "../../constants/uiStaticItems";

export const Maps = (): JSX.Element => {
	return <BodyTab tabs={mapTabs} />;
};
