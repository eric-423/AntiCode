import { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import "./NewEquipment.css";
import ICONS from "../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";
import { toast } from "react-toastify/unstyled";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../constant/localStorage";

const NewEquipment = ({ setShowModal, setRefreshData }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [equipmentType, setEquipmentType] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [selectedEquipmentType, setSelectedEquipmentType] = useState("");
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(atob(auth));
    }, [auth]);


    const modalRoot = document.body;

    const handleClickClose = () => {
        setShowModal(false);
    };

    const fetchEquipmentTypes = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/equipment-type/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch equipment types");

            const data = await response.json();
            setEquipmentType(data);
        } catch (error) {
            console.error("Error fetching equipment types:", error);
            toast.error("Error fetching equipment types");
        }
    }, []);

    useEffect(() => {
        fetchEquipmentTypes();
    }, [fetchEquipmentTypes]);

    const showToastMessage = (message, isSuccess = true) => {
        if (isSuccess) {
            toast.success(message, { position: "top-right" });
        } else {
            toast.error(message, { position: "top-right" });
        }
    };

    const validateInputs = () => {
        if (!selectedEquipmentType) {
            showToastMessage("Please select equipment type", false);
            return false;
        }
        if (!name) {
            showToastMessage("Name cannot be empty", false);
            return false;
        }
        if (!description) {
            showToastMessage("Description cannot be empty", false);
            return false;
        }
        if (quantity < 1) {
            showToastMessage("Quantity must be greater than 0", false);
            return false;
        }
        return true;
    };

    const handleOnClick = async () => {
        if (!validateInputs()) return;

        const typeId = equipmentType.find(item => Number(item.id) === Number(selectedEquipmentType))?.id || '';
        const equipment = {
            name,
            description,
            quantity,
            equipmentType: equipmentType.find(item => Number(item.id) === Number(selectedEquipmentType))?.name || '',
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/farming-equipment/${typeId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,

                    },
                    body: JSON.stringify(equipment),
                }
            );
            if (!response.ok) throw new Error("Failed to create Equipment");
            const data = await response.json();
            if (!data) throw new Error("No data returned");
            showToastMessage("Equipment was added!");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            showToastMessage("Equipment cannot be added!", false);
        } finally {
            setRefreshData(prev => !prev);
        }
    };

    return ReactDOM.createPortal(
        <div className="modal-create-plant-container">
            <div className="modal-create-plant">
                <Form className="form-addition-plant-type form-create-plant">
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        NEW EQUIPMENT
                    </h4>

                    <Form.Group className="mb-2 group-3-column-create-plant">
                        <Form.Label className="text-label-login">EQUIPMENT TYPE</Form.Label>
                        <Form.Select
                            value={selectedEquipmentType}
                            onChange={(e) => setSelectedEquipmentType(e.target.value)}
                            className="input-login input-addition input-plant-type-create-plant"
                        >
                            <option value="">SELECT EQUIPMENT TYPE</option>
                            {equipmentType.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">EQUIPMENT NAME</Form.Label>
                        <Form.Control
                            className="input-login input-addition input-name-create-plant"
                            type="text"
                            placeholder="Rosa Orange Glow (Shrub Rose)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">DESCRIPTION</Form.Label>
                        <Form.Control
                            className="input-addition input-characteristis-create-plant"
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="group-3-column-create-plant" style={{ maxWidth: "100px" }}>
                        <Form.Label className="text-label-login">QUANTITY</Form.Label>
                        <Form.Control
                            className="input-login input-addition "
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        text="Create"
                        handleOnClick={handleOnClick}
                        className="button-create-plant "
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

export default NewEquipment;
