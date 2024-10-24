import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { bannerTabs } from "../../constants/uiStaticItems";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const BannersPage = withInternalSession((): JSX.Element => {
	return <BodyTab tabs={bannerTabs} />;
});
