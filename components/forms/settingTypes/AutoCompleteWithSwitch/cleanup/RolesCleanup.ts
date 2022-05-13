import { IComponentServerSettings, IRolesData } from "../../../../../interfaces/api/Component";
import { IAutoCompleteData } from "../../util/AutoComplete/AutoComplete";


interface Props {
	selectedData?: IAutoCompleteData[],
	roles?: IRolesData[],
	onComponentSettingChange: (data: IComponentServerSettings) => void,
	settings: IComponentServerSettings
}

const RolesCleanup = (props: Props): void => {
	if (props.selectedData && props.roles) {
		const newRoles = checkIfRoleNameAsBeenChanged(props.roles, props.selectedData);
		if (newRoles) {
			props.onComponentSettingChange(
				{
					...props.settings,
					...{data: editRoleData(props.settings.data, newRoles)},
				},
			);
		}
	}
};


const editRoleData = (data: object, roles: IRolesData[]): object => {
	data = {
		...data,
		roles: roles,
	};

	return data;
};

interface FoundRoleWithId {
	role?: IRolesData;
	index?: number;
}

const checkIfRoleNameAsBeenChanged = (
	availableRoles: IRolesData[],
	selectedRoles: IRolesData[],
): IRolesData[] | false => {
	const updatedRoles = selectedRoles;
	let roleHaveUpdated = false;

	selectedRoles.forEach((selectedRole, selectedRoleIndex) => {
		let foundRole = false;
		availableRoles.forEach(availableRole => {
			if (selectedRole.name === availableRole.name) {
				foundRole = true;
			}
		});
		if (!foundRole) {
			let foundRoleWithId: FoundRoleWithId = {};
			availableRoles.forEach((availableRole, availableRoleIndex) => {
				if (selectedRole.id === availableRole.id) {
					foundRoleWithId = {
						role: availableRole,
						index: availableRoleIndex,
					};
				}
			});

			if (foundRoleWithId.role && foundRoleWithId.index) {
				updatedRoles[selectedRoleIndex].name = foundRoleWithId.role.name;
			} else {
				updatedRoles.splice(1, selectedRoleIndex);
			}

			roleHaveUpdated = true;
		}
	});

	if (!roleHaveUpdated) {
		return false;
	} else {
		return updatedRoles;
	}
};


export default RolesCleanup;
