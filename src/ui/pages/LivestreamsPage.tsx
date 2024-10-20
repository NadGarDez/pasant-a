import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { videoTabs } from "../../constants/uiStaticItems";

export const LivestreamsPage = (): JSX.Element => {
	return <BodyTab tabs={videoTabs} />;
};
