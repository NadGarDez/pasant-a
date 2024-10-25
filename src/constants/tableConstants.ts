export interface keyValueInterface {
	key: string;
	label: string;
	cellComponent?: string;
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
		cellComponent: "type",
	},
	{
		key: "startDate",
		label: "Start Date",
		cellComponent: "date",
	},
	{
		key: "endDate",
		label: "End Date",
		cellComponent: "date",
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
		cellComponent: "status",
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
		cellComponent: "maps",
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
		// 	{
		//   const components = (props.manage && props.manage.components) || [];
		//   const component = components.find(current => current.id === value);
		//   return (component && component.name) || value;
		// }
	},
	{
		key: "type",
		label: "Type",
		// 	{
		//   const component = TYPE_STATUS.find(current => current.value === value);
		//   return (component && component.label) || value;
		// }
	},
	// {
	// 	key: "idSection",
	// 	label: "Attributes",
	// 		{
	// 	  const {
	// 		manage: { data }
	// 	  } = ownProps;
	// 	  const instance = data.find(item => item.idSection === value);
	// 	  return (
	// 		<div style={{ display: 'flex', flexDirection: 'row' }}>
	// 		  <div style={{ marginRight: 5 }}>
	// 			{shouldRenderVisibleIcon(instance) === true ? (
	// 			  <VectorIcons font="Entypo" name="eye-with-line" size={20} />
	// 			) : null}
	// 		  </div>
	// 		  {shouldRenderLockIcon(instance) === true ? (
	// 			<VectorIcons font="FontAwesome" name="lock" size={20} />
	// 		  ) : null}
	// 		</div>
	// 	  );
	// 	}
	// },
];

export const bannersTableStructure: keyValueInterface[] = [
	{
		key: "cloudStorageLocation",
		label: "Banner Image",
		cellComponent: "image",
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
	},
	{
		key: "startDate",
		label: "Start time",
		cellComponent: "date",
	},
];
