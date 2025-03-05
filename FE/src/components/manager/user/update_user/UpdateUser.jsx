import { useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image.js";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button.jsx";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';


const UpdateUser = ({ setShowModal, itemUpdate }) => {
    const [userName, setUserName] = useState(itemUpdate.userName);
    const [email, setEmail] = useState(itemUpdate.email);
    const [password, setPassword] = useState(itemUpdate.password);
    const [address, setAddress] = useState(itemUpdate.address);
    const [dateOfBirth, setDateOfBirth] = useState(itemUpdate.dateOfBirth);
    const [phoneNumber, setPhoneNumber] = useState(itemUpdate.phoneNumber);
    const [role, setRole] = useState(itemUpdate.role);
    const modalRoot = document.body;

    const handleClickClose = () => {
        setShowModal(false);
        setUserName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setDateOfBirth('');
        setPhoneNumber('');
        setRole('');
    };

    console.log(itemUpdate);
    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'yyyy-MM-dd');
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleOnClick = async () => {
        if (!userName.trim()) {
            return showToastMessageFail("userName cannot be empty");
        }
        if (!isValidEmail(email)) {
            return showToastMessageFail("Invalid email format");
        }
        console.log(password)

        const user = {
            id: itemUpdate.id,
            userName,
            password,
            email,
            address,
            dateOfBirth,
            phoneNumber,
            role: role,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/user/${itemUpdate.id}`, {
                method: "PUT", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error("Failed to update user");
            const data = await response.json();
            if (!data) throw new Error("No data returned");
            showToastMessageSuccess("user was updated!");
            setShowModal(false);
        } catch (error) {
            console.error("Error updating user:", error);
            showToastMessageFail("user cannot be updated!");
            setShowModal(true);
        } finally {
            window.location.reload();
        }
    };


    const showToastMessageSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
        });
    };

    const showToastMessageFail = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };


    return ReactDOM.createPortal(<div className="modal-create-plant-container">
        <div className="modal-create-plant">

            <Form className="form-addition-plant-type form-create-plant">
                <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                    UPDATE USER
                </h4>

                <Form.Group className="mb-2 group-3-column-create-plant">
                    <Form.Label className="text-label-login">USER ROLE</Form.Label>
                    <Form.Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="input-login input-addition input-plant-type-create-plant "
                    >
                        <option value={role}>{role}</option>
                        <option value="WORKER">WORKER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                    </Form.Select>

                </Form.Group>

                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">USERNAME</Form.Label>
                    <Form.Control
                        className="input-login input-addition input-name-create-plant"
                        type="text"
                        placeholder="Rosa Orange Glow (Shrub Rose)"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">PASSWORD</Form.Label>
                    <Form.Control
                        className="input-login input-addition input-name-create-plant"
                        type="password"
                        placeholder="Rosa Orange Glow (Shrub Rose)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>


                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">EMAIL</Form.Label>
                    <Form.Control
                        className="input-login input-addition input-name-create-plant"
                        type="text"
                        placeholder="Rosa Orange Glow (Shrub Rose)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>


                <Form.Group>
                    <Form.Label className="text-label-login">ADDRESS</Form.Label>
                    <Form.Control
                        className="input-login input-addition"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-label-login">DATE OF BIRTH</Form.Label>
                    <Form.Control
                        className="input-login input-addition"
                        type="date"
                        value={formatDate(dateOfBirth)}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-label-login">PHONE NUMBER</Form.Label>
                    <Form.Control
                        className="input-login input-addition"
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>
                <Button
                    text="Update"
                    handleOnClick={handleOnClick}
                    className="button-update-plant mt-5"
                />


            </Form>

            <img
                className="icon-close"
                onClick={() => handleClickClose()}
                src={ICONS.icon_close}
                alt=""
            />
        </div>
    </div>, modalRoot);
};

export default UpdateUser;
