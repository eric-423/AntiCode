import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image.js";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";

const UpdateChemical = ({ setShowModal, itemUpdate }) => {
    const [chemicalName, setChemicalName] = useState();
    const [description, setDescription] = useState();
    const [manufacturingDate, setManufacturingDate] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [volumneAvailable, setVolumneAvailable] = useState();
    const [chemicalType, setChemicalType] = useState();

    const modalRoot = document.body;
    const handleClickClose = () => {
        setShowModal(false);
    };
    const [plantTypesData, setPlantTypesData] = useState();

    const handleFetchDataPlantType = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) throw new Error();
            const data = await response.json();
            setPlantTypesData(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleFetchDataPlantType();
    }, []);
    useEffect(() => {
        console.log(itemUpdate)
    })

    return ReactDOM.createPortal(
        <div className="modal-create-plant-container">
            <div className="modal-create-plant">
                <Form className="form-addition-plant-type form-create-plant">
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        UPDATE CHEMICAL
                    </h4>
                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Name</Form.Label>
                        <Form.Control
                            className="input-login input-addition input-name-create-plant"
                            type="text"
                            placeholder="Rosa Orange Glow (Shrub Rose)"
                            value={itemUpdate.chemical_name}
                            onChange={(e) => setChemicalName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Description</Form.Label>
                        <Form.Control
                            className="input-login input-addition input-characteristis-create-plant"
                            type="text"
                            placeholder="Showy, Cut Flowers"
                            value={itemUpdate.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-label-login">Manufacturing Date</Form.Label>
                        <Form.Control
                            className="input-login input-addition"
                            type="date"
                            placeholder="Acid, Alkaline, Neutral"
                            value={itemUpdate.manufacturing_date}
                            onChange={(e) => setManufacturingDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-label-login">Expiration Date</Form.Label>
                        <Form.Control
                            className="input-login input-addition"
                            type="date"
                            value={itemUpdate.expiration_date}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            placeholder="Average"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-label-login">Volumne Available</Form.Label>
                        <Form.Control
                            className="input-login input-addition input-number"
                            type="number"
                            placeholder="10"
                            min="1"
                            value={itemUpdate.volumne_available}
                            onChange={(e) => setVolumneAvailable(e.target.value)}
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-2 group-3-column-create-plant">
                        <Form.Label className="text-label-login">Chemical Type</Form.Label>
                        <Form.Select
                            onChange={(e) => setChemicalType(e.target.value)}
                            className="input-login input-addition input-plant-type-create-plant"
                        >
                            {plantTypesData &&
                                Array.isArray(plantTypesData) &&
                                plantTypesData.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                        </Form.Select>
                    </Form.Group> */}
                    <Button text="Update Plant" className="button-create-plant" />
                </Form>
                <img
                    className="icon-close"
                    onClick={() => handleClickClose()}
                    src={ICONS.icon_close}
                    alt=""
                />
            </div>
        </div>,
        modalRoot
    );
};

export default UpdateChemical;
