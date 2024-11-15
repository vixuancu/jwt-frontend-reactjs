import { useEffect, useState } from "react";
import { fetAllUser, deleteUser } from "../../services/UserService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import "./Users.scss";
const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [dataModal, setDataModal] = useState({}); //modal delete
  const [dataModalUpdate, setDataModalUpdate] = useState({});
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const fetchUsers = async () => {
    let res = await fetAllUser(currentPage, currentLimit);
    if (res && res.EC === 0) {
      //console.log(res.DT);
      setTotalPages(res.DT.totalPages);
      setListUsers(res.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };
  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setDataModalUpdate(user);
    setIsShowModalUser(true);
  };
  const handleClose = () => {
    setDataModal({});
    setIsShowModalDelete(false);
  };
  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUpdate({});
    await fetchUsers();
  };
  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.EM);
    }
  };
  const handleRefresh = async () => {
    await fetchUsers();
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage users</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn-success  btn"
                onClick={() => {
                  handleRefresh();
                }}
              >
                Refresh
                <i className="fa fa-refresh"></i>
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                Add new user <i className="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <button
                              title="Edit"
                              className="btn btn-warning"
                              onClick={() => handleEditUser(item)}
                            >
                              Edit <i class="fa fa-pencil"></i>
                            </button>
                            <button
                              title="Delete"
                              className="btn btn-danger ms-2"
                              onClick={() => handleDeleteUser(item)}
                            >
                              Delete <i class="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found user</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        show={isShowModalUser}
        onHide={onHideModalUser}
        action={actionModalUser}
        dataModalUpdate={dataModalUpdate}
      />
    </>
  );
};
export default Users;
