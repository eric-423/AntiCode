import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./NewChemical.css";
import ICONS from "../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";
import { toast } from "react-toastify/unstyled";

const NewChemical = ({ setShowModal, setRefreshData }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [volumeAvailable, setVolumeAvailable] = useState();
    const [chemicalTypes, setChemicalTypes] = useState([]);
    const [selectedChemicalType, setSelectedChemicalTypeId] = useState("");

    const modalRoot = document.body;

    const handleClickClose = () => {
        setShowModal(false);
    };

    const handleFetchDataChemicalType = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical-type`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch chemical types");

            const data = await response.json();
            setChemicalTypes(data);
        } catch (error) {
            console.error("Error fetching chemical types:", error);
            toast.error("Error fetching chemical types");
        }
    };



    useEffect(() => {
        handleFetchDataChemicalType();
    }, []);


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



    const handleOnClick = async () => {
        const chemical = {
            name,
            description,
            manufacturingDate,
            expirationDate,
            volumeAvailable,
        };

        if (!name || !selectedChemicalType || !manufacturingDate || !expirationDate) {
            return showToastMessageFail("Please fill all required fields");
        }
        if (expirationDate < manufacturingDate) {
            return showToastMessageFail("Expiration date must be greater than manufacturing date");
        }
        if (volumeAvailable < 1) {
            return showToastMessageFail("Volume available must be greater than 0");
        }

        try {
            console.log(selectedChemicalType);
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical/${selectedChemicalType}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(chemical),
                }
            );

            if (!response.ok) throw new Error("Failed to create Chemical");
            const data = await response.json();
            if (!data) throw new Error("No data returned");
            showToastMessageSuccess("Chemical was added!");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            showToastMessageFail("Chemical cannot be added!");
            setShowModal(true);
        } finally {
            setRefreshData(prev => !prev);
        }
    };



    return ReactDOM.createPortal(
        <div className="modal-create-plant-container">
            <div className="modal-create-plant">

                <Form className="form-addition-plant-type form-create-plant">
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        NEW CHEMICAL
                    </h4>
                    <Form.Group className="mb-2 group-3-column-create-plant">
                        <Form.Label className="text-label-login">Chemical Type</Form.Label>
                        <Form.Select
                            onChange={(e) => setSelectedChemicalTypeId(e.target.value)}
                            className="input-login input-addition input-plant-type-create-plant"
                        >
                            <option value="">Select Chemical Type</option>
                            {
                                chemicalTypes &&
                                Array.isArray(chemicalTypes) &&
                                chemicalTypes.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Chemical Name</Form.Label>
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
                            className=" input-addition input-characteristis-create-plant"
                            as="textarea"
                            rows={3}
                            placeholder="Showy, Cut Flowers"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-label-login">Manufacturing date</Form.Label>
                        <Form.Control
                            className="input-login input-addition"
                            type="date"
                            value={manufacturingDate}
                            onChange={(e) => setManufacturingDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-label-login">Expiration date</Form.Label>
                        <Form.Control
                            className="input-login input-addition"
                            type="date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-label-login">Volume available</Form.Label>
                        <Form.Control
                            className="input-login input-addition input-number"
                            type="number"
                            placeholder="10"
                            min="1"
                            value={volumeAvailable}
                            onChange={(e) => setVolumeAvailable(e.target.value)}
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

export default NewChemical;
