import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetAllRole, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";
const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      getAllRole();
    }
  };

  const getAllRole = async () => {
    let data = await fetAllRole();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  useEffect(() => {
    getAllRole();
  }, []);
  useImperativeHandle(ref, () => ({
    fetListRolesAgain() {
      getAllRole();
    },
  }));
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Url</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        title="Delete"
                        className="btn btn-danger ms-2"
                        onClick={() => handleDeleteRole(item)}
                      >
                        Delete <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td>Not found role</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
});
export default TableRole;
