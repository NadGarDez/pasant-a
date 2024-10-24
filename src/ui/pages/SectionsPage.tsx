import React from "react";
import { BodyTab } from "../sections/BodyTab";
import { sectionTabs } from "../../constants/uiStaticItems";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const SectionsPage = withInternalSession((): JSX.Element => {
	return <BodyTab tabs={sectionTabs} />;
});
