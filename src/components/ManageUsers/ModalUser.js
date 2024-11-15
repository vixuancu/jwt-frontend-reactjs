import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../services/UserService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
// not merge state loash hỗ trợ hàm cloneDeep()
const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);
  // do quản lí nhiều state nên dùng object mà không dùng useState
  const dafaultUserData = {
    // viet sai tu defaltUserData
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const [userData, setUserData] = useState(dafaultUserData);
  useEffect(() => {
    // component didMount
    getGroup();
  }, []);
  useEffect(() => {
    // component didUpdate
    if (props.action === "UPDATE") {
      //console.log("check data update:", props.dataModalUpdate);
      setUserData({
        ...props.dataModalUpdate,
        group: props.dataModalUpdate.Group
          ? props.dataModalUpdate.Group.id
          : "",
      });
    }
  }, [props.dataModalUpdate]);
  useEffect(() => {
    if (props.action === "CREATE") {
      if (userGroup && userGroup.length > 0) {
        setUserData({ ...userData, group: userGroup[0].id });
      }
    }
  }, [props.action]);
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value; // tuong tu cu phap obj.name
    setUserData(_userData);
  };
  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const checkValidateInputs = () => {
    if (props.action === "UPDATE") return true;
    // create user
    setValidInputs(validInputsDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    let _validInputs = _.cloneDeep(validInputsDefault); // video để trong loop
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleConfirmUser = async () => {
    // create user
    let check = checkValidateInputs();
    if (check) {
      let res =
        props.action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"], // chèn thêm groupId để giống backend or sửa data từ group => groupId
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });

      // console.log('check res:',res)
      if (res.data && res.data.EC === 0) {
        props.onHide();
        setUserData({
          ...dafaultUserData,
          group: userGroup && userGroup.length > 0 ? userGroup[0].id : "",
        });
      }
      if (res.data && res.data.EC !== 0) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.data.DT] = false;
        setValidInputs(_validInputs);
        toast.error(res.data.EM);
      }
    }
  };
  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(dafaultUserData);
    setValidInputs(validInputsDefault);
  };
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => handleCloseModalUser()}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "CREATE NEW USER" : "EDIT A USER"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address: <span className="red">(*)</span>
              </label>
              <input
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number: <span className="red">(*)</span>
              </label>
              <input
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username: </label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {props.action === "CREATE" && (
                <>
                  <label>
                    Password: <span className="red">(*)</span>
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) =>
                      handleOnchangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="col-12  form-group">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender:</label>
              <select
                className="form-select"
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "sex")
                }
                value={userData.sex}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6  form-group">
              <label>
                Group: <span className="red">(*)</span>
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "group")
                }
                value={userData.group} //value ở đây là truyền giá trị lên modalUpdate
              >
                {userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {props.action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUser;
