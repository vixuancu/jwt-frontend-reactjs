import { useEffect, useRef, useState } from "react";
import "./Role.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = (props) => {
  const childRef = useRef();
  const dataChildDefault = {
    url: "",
    description: "",
    isValidUrl: true,
  };
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };
  // add and delete sreach gg là làm việc với Object react,học ngu vcl
  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };
  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };
  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      //call api
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        // console.log(childRef);
        childRef.current.fetListRolesAgain();
      }
    } else {
      toast.error("input URL must not be empty");
      //error
      console.log("invalidObj", invalidObj);
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
    console.log("listchilds", listChilds);
  };
  return (
    <>
      <div className="role-container ">
        <div className="container">
          <div className="adding-roles mt-3">
            <div className="title-role">
              <h4>Add a new role</h4>
            </div>
            <div className=" role-parent">
              {Object.entries(listChilds).map(([key, child], index) => {
                return (
                  <div className="row role-child" key={`child-${key}`}>
                    <div className={`col-5 form-group ${key}`}>
                      <label>URL:</label>
                      <input
                        onChange={(event) =>
                          handleOnchangeInput("url", event.target.value, key)
                        }
                        type="text"
                        className={
                          child.isValidUrl
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={child.url}
                      ></input>
                    </div>
                    <div className="col-5 form-group">
                      <label>Descriptions:</label>
                      <input
                        onChange={(event) =>
                          handleOnchangeInput(
                            "description",
                            event.target.value,
                            key
                          )
                        }
                        ty
                        type="text"
                        className="form-control"
                        value={child.description}
                      ></input>
                    </div>
                    <div className="col-2 mt-4  actions">
                      <i
                        className="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          className="fa fa-trash delete"
                          onClick={() => handleDeleteInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}

              <div>
                <button
                  className="btn btn-warning mt-3"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="mt-3">
            <h4>List Current Roles</h4>
            <TableRole ref={childRef} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Role;
