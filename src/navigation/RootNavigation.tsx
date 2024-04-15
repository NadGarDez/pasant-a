import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { EventsPage } from "../ui/pages/EventsPage";
import { DisclaimersPage } from "../ui/pages/DisclaimersPage";
import { GroupsPage } from "../ui/pages/GroupsPage";
import { VersionsPage } from "../ui/pages/VersionsPage";
import { ProfilePage } from "../ui/pages/ProfilePage";
import { LoginPage } from "../ui/pages/Login";
import { ConfigPage } from "../ui/pages/ConfigPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Box>
				<Typography>Index</Typography>
			</Box>
		),
	},
	{
		path: "/config",
		element: <ConfigPage />,
	},
	{
		path: "/events",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/configuration",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/topics",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/fundamentals",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/maps",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/adverticements",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/adverticements",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/polls",
		element: <EventsPage />,
	},
	{
		path: "/events/:id/livestreams",
		element: <EventsPage />,
	},
	{
		path: "/disclaimers",
		element: <DisclaimersPage />,
	},
	{
		path: "/groups",
		element: <GroupsPage />,
	},
	{
		path: "/versions",
		element: <VersionsPage />,
	},
	{
		path: "/profile",
		element: <ProfilePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

export const RootNavigation = (): JSX.Element => {
	return <RouterProvider router={router} />;
};
