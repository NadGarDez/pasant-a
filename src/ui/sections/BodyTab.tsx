import React, { useState } from "react";
import { type tab } from "../../types/uiTypes";
import { Box, Icon, Paper, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabSelector } from "../components/TabSelector";

interface props {
	title?: string;
	tabs: tab[];
}

export const BodyTab = (props: props): JSX.Element => {
	const { tabs } = props;

	const [page, setPage] = useState<number>(0);

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: string,
	): void => {
		setPage(parseInt(newValue));
	};

	return (
		<Paper
			elevation={3}
			sx={{
				width: "100%",
				flex: 1,
				padding: 3,
				minHeight: 400,
			}}
		>
			<Box>
				<Tabs onChange={handleChange} value={page}>
					{tabs.map((item, index) => (
						<Tab
							icon={<Icon>{item.icon}</Icon>}
							label={item.label}
							value={index}
							key={`tab_${item.name}`}
						/>
					))}
				</Tabs>
			</Box>
			<Box flex={1} mt={3}>
				<TabSelector name={tabs[page].name} />
			</Box>
		</Paper>
	);
};
