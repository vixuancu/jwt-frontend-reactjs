import { useState, useEffect } from "react";
import "./GroupRole.scss";
import { fetchGroup } from "../../services/UserService";
import { toast } from "react-toastify";
import {
  fetAllRole,
  fetchRolesByGroup,
  assignRolesToGroup,
} from "../../services/roleService";
import _ from "lodash";
const GroupRole = () => {
  const [userGroup, setUserGroup] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
  const getAllRole = async () => {
    let data = await fetAllRole();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  useEffect(() => {
    // component didMount
    getGroup();
    getAllRole();
  }, []);
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroup(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  const handleOnchangeSelect = async (value) => {
    setSelectGroup(value);
    if (value) {
      let res = await fetchRolesByGroup(value);
      if (res && res.EC === 0) {
        console.log("group roles:", res);
        console.log("lists Roles:", listRoles);
        let result = buildDataRolesByGroup(res.DT.Roles, listRoles);
        setAssignRolesByGroup(result);
        console.log("result:", result);
      } else {
        toast.error(res.EM);
      }
    }
  };
  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleSelectRole = (value) => {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }
    setAssignRolesByGroup(_assignRolesByGroup);
  };
  const buildDataToSave = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalgroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalgroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="group-role-container">
      <div className="container">
        <div className="mt-3">
          <h4>GroupRole</h4>
        </div>
        <div className="assign-group-role">
          <div className="col-12 col-sm-6  form-group">
            <label>
              Select Group: <span className="red">(*)</span>
            </label>
            <select
              className={"form-select"}
              onChange={(event) => handleOnchangeSelect(event.target.value)}
            >
              <option value={""}>Please select your group</option>
              {userGroup.length > 0 &&
                userGroup.map((item, index) => {
                  return (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <hr />
            {selectGroup && (
              <div className="roles">
                <h5>Assign Roles:</h5>
                {assignRolesByGroup &&
                  assignRolesByGroup.length > 0 &&
                  assignRolesByGroup.map((item, index) => {
                    return (
                      <div class="form-check" key={`role-${index}`}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={item.id}
                          checked={item.isAssigned}
                          onChange={(event) =>
                            handleSelectRole(event.target.value)
                          }
                          id={`role-${index}`}
                        />
                        <label class="form-check-label" for={`role-${index}`}>
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
                <div className="mt-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GroupRole;
