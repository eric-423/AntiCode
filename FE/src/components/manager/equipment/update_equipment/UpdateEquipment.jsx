import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image.js";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button.jsx";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEquipment = ({ setShowModal, itemUpdate }) => {
    const [name, setName] = useState(itemUpdate.name || '');
    const [description, setDescription] = useState(itemUpdate.description || '');
    const [quantity, setQuantity] = useState(itemUpdate.quantity || 0);
    const [equipmentType, setEquipmentType] = useState('');
    const [equipmentTypesData, setEquipmentTypesData] = useState([]);
    const modalRoot = document.body;

    const handleClickClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (equipmentTypesData && itemUpdate && itemUpdate.typeName) {
            const matchingType = equipmentTypesData.find((type) => type.name === itemUpdate.typeName);
            if (matchingType) {
                setEquipmentType(matchingType.id);
            }
        }
    }, [equipmentTypesData, itemUpdate]);

    useEffect(() => {
        handleFetchDataEquipmentType();
    }, []);

    const handleFetchDataEquipmentType = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/equipment-type/`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to fetch equipment types");
            const data = await response.json();
            setEquipmentTypesData(data);
        } catch (error) {
            console.error("Error fetching equipment types:", error);
            showToastMessageFail("Unable to load equipment types. Please try again later.");
        }
    };

    const validateInputs = () => {
        if (!equipmentType) {
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

    const showToastMessage = (message, isSuccess = true) => {
        if (isSuccess) {
            toast.success(message, { position: "top-right" });
        } else {
            toast.error(message, { position: "top-right" });
        }
    };

    const handleOnClick = async () => {
        if (!validateInputs()) return;

        const equipment = {
            id: itemUpdate.id,
            name,
            description,
            quantity,
            equipmentType,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/farming-equipment/${equipmentType}`, {
                method: "PUT", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(equipment),
            });

            if (!response.ok) throw new Error("Failed to update equipment");
            const data = await response.json();
            if (!data) throw new Error("No data returned");
            showToastMessageSuccess("Equipment was updated!");
            setShowModal(false);
        } catch (error) {
            console.error("Error updating equipment:", error);
            showToastMessageFail("Equipment cannot be updated!");
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
                    UPDATE EQUIPMENT
                </h4>

                {/* Select Type */}
                <Form.Group className="mb-2 group-3-column-create-plant">
                    <Form.Label className="text-label-login">EQUIPMENT TYPE</Form.Label>
                    <Form.Select
                        value={equipmentType}
                        onChange={(e) => setEquipmentType(e.target.value)}
                        className="input-login input-addition input-plant-type-create-plant "
                    >
                        {equipmentTypesData && Array.isArray(equipmentTypesData) && equipmentTypesData.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>))}
                    </Form.Select>

                </Form.Group>

                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">Name</Form.Label>
                    <Form.Control
                        className="input-login input-addition input-name-create-plant"
                        type="text"
                        placeholder="Rosa Orange Glow (Shrub Rose)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>


                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        className=" input-addition input-characteristis-create-plant"
                        placeholder="Showy, Cut Flowers"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </Form.Group>

                <Form.Group className="group-3-column-create-plant" style={{ maxWidth: "100px" }}>
                    <Form.Label className="text-label-login">Quantity</Form.Label>
                    <Form.Control
                        className="input-login input-addition input-number"
                        type="number"
                        placeholder="10"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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

export default UpdateEquipment;
