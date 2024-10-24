import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { mapTabs } from "../../constants/uiStaticItems";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const Maps = withInternalSession((): JSX.Element => {
	return <BodyTab tabs={mapTabs} />;
});
