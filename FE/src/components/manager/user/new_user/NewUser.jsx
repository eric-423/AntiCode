import { useState } from "react";
import ReactDOM from "react-dom";
import "./NewUser.css";
import ICONS from "../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";
import { toast } from "react-toastify/unstyled";

const NewUser = ({ setShowModal, setRefreshData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");

    const modalRoot = document.body;

    const handleClickClose = () => {
        setShowModal(false);
    };

    const showToastMessage = (message, isSuccess = true) => {
        if (isSuccess) {
            toast.success(message, { position: "top-right" });
        } else {
            toast.error(message, { position: "top-right" });
        }
    };

    const validateInputs = () => {
        if (role === "") {
            showToastMessage("Please select role type", false);
            return false;
        }
        if (!name) {
            showToastMessage("Name cannot be empty", false);
            return false;
        }
        if (!email) {
            showToastMessage("Email cannot be empty", false);
            return false;
        }
        if (!password) {
            showToastMessage("Password cannot be empty", false);
            return false;
        }
        if (!address) {
            showToastMessage("Address cannot be empty", false);
            return false;
        }
        if (!dateOfBirth) {
            console.log(dateOfBirth)
            showToastMessage("Date of birth cannot be empty", false);
            return false;
        }
        if (!phoneNumber) {
            showToastMessage("Phone number cannot be empty", false);
            return false;
        }
        return true;
    };

    const handleOnClick = async () => {

        if (!validateInputs()) return;
        const user = {
            userName: name,
            password,
            email,
            address,
            dateOfBirth,
            phoneNumber,
            role: role,
        };


        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            if (!response.ok) throw new Error("Failed to create User");
            const data = await response.json();
            if (!data) throw new Error("No data returned");
            showToastMessage("User was added!");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            showToastMessage("User cannot be added!", false);
        } finally {
            setRefreshData(prev => !prev);
        }
    };

    return ReactDOM.createPortal(
        <div className="modal-create-plant-container">
            <div className="modal-create-plant">
                <Form className="form-addition-plant-type form-create-plant">
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        NEW USER
                    </h4>

                    <Form.Group className="mb-2 group-3-column-create-plant">
                        <Form.Label className="text-label-login">USER ROLE</Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="input-login input-addition input-plant-type-create-plant"
                        >
                            <option value="">SELECT ROLE</option>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={dateOfBirth}
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
                        text="Create"
                        handleOnClick={handleOnClick}
                        className="button-create-plant"
                    />
                </Form>
                <img
                    className="icon-close"
                    onClick={handleClickClose}
                    src={ICONS.icon_close}
                    alt="Close"
                />
            </div>
        </div>,
        modalRoot
    );
};

export default NewUser;
