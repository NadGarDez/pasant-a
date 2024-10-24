import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { videoTabs } from "../../constants/uiStaticItems";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const LivestreamsPage = withInternalSession((): JSX.Element => {
	return <BodyTab tabs={videoTabs} />;
});
