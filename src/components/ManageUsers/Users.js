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
  const [dataModal, setDataModal] = useState({});
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const fetchUsers = async () => {
    let res = await fetAllUser(currentPage, currentLimit);
    if (res && res.data && res.data.EC === 0) {
      //console.log(res.data.DT);
      setTotalPages(res.data.DT.totalPages);
      setListUsers(res.data.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };
  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };
  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table users</h3>
            </div>
            <div className="actions">
              <button className="btn-success  btn">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
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
                          <td>{index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button
                              className="btn btn-danger ms-3"
                              onClick={() => handleDeleteUser(item)}
                            >
                              Delete
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
      <ModalUser title={"create new User"} />
    </>
  );
};
export default Users;
