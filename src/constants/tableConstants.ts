import moment, { type MomentInput } from "moment";

const MAPS_TYPE = [
	{
		value: 0,
		label: "Map area",
	},
	{
		value: 1,
		label: "Level Image",
	},
	{
		value: 2,
		label: "Web View Map",
	},
];

export const DATE_FORMAT = "L [at] LTS";
export interface keyValueInterface {
	key: string;
	label: string;
	cellFormatter?: (value: any) => string;
}

export const eventsTableStructure: keyValueInterface[] = [
	{
		key: "name",
		label: "Event Name",
	},
	{
		key: "mnemonic",
		label: "Mnemonic",
	},
	{
		key: "status",
		label: "Status",
	},
	{
		key: "type",
		label: "Type",
		cellFormatter: value => (String(value) === "0" ? "Normal" : "Parent"),
	},
	{
		key: "startDate",
		label: "Start Date",
		cellFormatter: value => moment(value as MomentInput).format(DATE_FORMAT),
	},
	{
		key: "endDate",
		label: "End Date",
		cellFormatter: value => moment(value as MomentInput).format(DATE_FORMAT),
	},
];

export const configTableStructure: keyValueInterface[] = [
	{
		key: "idConfig",
		label: "id",
	},
	{
		key: "configKey",
		label: "Key",
	},
	{
		key: "configValue",
		label: "Value",
	},
];

export const disclaimerTableStructure: keyValueInterface[] = [
	{
		key: "idDisclaimer",
		label: "id",
	},

	{
		key: "title",
		label: "Title",
	},
	{
		key: "cloudStorageLocation",
		label: "Url",
	},
	{
		key: "status",
		label: "Status",
		cellFormatter: value => (value === 1 ? "Active" : "Inactive"),
	},
];

export const groupsTableStructure: keyValueInterface[] = [
	{
		key: "idProfile",
		label: "idProfile",
	},
	{
		key: "name",
		label: "Name",
	},
	{
		key: "oktaId",
		label: "oktaId",
	},
	{
		key: "role",
		label: "Role",
	},
];

export const versionsTableStructure: keyValueInterface[] = [
	{
		key: "idVersion",
		label: "id",
	},
	{
		key: "name",
		label: "Name",
	},

	{
		key: "versionNumber",
		label: "Version Number",
	},

	{
		key: "status",
		label: "Status Name",
	},
];

export const mapTableStructure: keyValueInterface[] = [
	{
		key: "name",
		label: "Name",
	},
	{
		key: "type",
		label: "Type",
		cellFormatter: value => {
			const type = MAPS_TYPE.find(current => current.value === value);
			return type?.label ?? value;
		},
	},
];

export const sectionTableStructure: keyValueInterface[] = [
	{
		key: "name",
		label: "Section",
	},
	{
		key: "templateId",
		label: "Template",
		cellFormatter: value => value,
		// 	{
		//   const components = (props.manage && props.manage.components) || [];
		//   const component = components.find(current => current.id === value);
		//   return (component && component.name) || value;
		// }
	},
	{
		key: "type",
		label: "Type",
		cellFormatter: value => value,
		// 	{
		//   const component = TYPE_STATUS.find(current => current.value === value);
		//   return (component && component.label) || value;
		// }
	},
	{
		key: "idSection",
		label: "Attributes",
		cellFormatter: (value /*, ownProps: propAttributes */) => value,
		// 	{
		//   const {
		// 	manage: { data }
		//   } = ownProps;
		//   const instance = data.find(item => item.idSection === value);
		//   return (
		// 	<div style={{ display: 'flex', flexDirection: 'row' }}>
		// 	  <div style={{ marginRight: 5 }}>
		// 		{shouldRenderVisibleIcon(instance) === true ? (
		// 		  <VectorIcons font="Entypo" name="eye-with-line" size={20} />
		// 		) : null}
		// 	  </div>
		// 	  {shouldRenderLockIcon(instance) === true ? (
		// 		<VectorIcons font="FontAwesome" name="lock" size={20} />
		// 	  ) : null}
		// 	</div>
		//   );
		// }
	},
];

export const bannersTableStructure: keyValueInterface[] = [
	{
		key: "cloudStorageLocation",
		label: "Banner Image",
	},
	{
		key: "title",
		label: "Title",
	},
	{
		key: "redirectUrl",
		label: "On tap, go to",
	},
	{
		key: "sections",
		label: "Appears on",
	},
];

export const videosTableStructure: keyValueInterface[] = [
	{
		key: "name",
		label: "Channel name",
	},
	{
		key: "url",
		label: "Channel url",
	},
	{
		key: "category",
		label: "Category",
	},
	{
		key: "type",
		label: "Video type",
		cellFormatter: value => value,
	},
	{
		key: "startDate",
		label: "Start time",
		cellFormatter: value => moment(value as string).format(DATE_FORMAT),
	},
];
