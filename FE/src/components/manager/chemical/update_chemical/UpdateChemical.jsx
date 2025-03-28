import { useEffect, useState } from "react";
import { format } from 'date-fns';
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image.js";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../constant/localStorage.js";

const UpdateChemical = ({ setShowModal, itemUpdate, refreshData }) => {
    const [chemicalName, setChemicalName] = useState(itemUpdate.name || '');
    const [description, setDescription] = useState(itemUpdate.description || '');
    const [manufacturingDate, setManufacturingDate] = useState(itemUpdate.manufacturingDate);
    const [expirationDate, setExpirationDate] = useState(itemUpdate.expirationDate);
    const [volumeAvailable, setVolumeAvailable] = useState(itemUpdate.volumeAvailable || 0);
    const [chemicalType, setChemicalType] = useState('');
    const [chemicalTypesData, setChemicalTypesData] = useState([]);

    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(atob(auth));
    }, [auth]);


    const modalRoot = document.body;

    const handleClickClose = () => {
        setShowModal(false);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'yyyy-MM-dd');
    };

    const handleFetchDataChemicalType = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/chemical-type`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error();
            const data = await response.json();
            setChemicalTypesData(data);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        handleFetchDataChemicalType();
    }, []);

    useEffect(() => {
        if (chemicalTypesData && itemUpdate && itemUpdate.chemicalType) {
            const matchingType = chemicalTypesData.find((type) => type.name === itemUpdate.chemicalType);
            if (matchingType) {
                setChemicalType(matchingType.id);
            }
        }
    }, [chemicalTypesData, itemUpdate]);

    const handleOnClick = async () => {
        const chemical = {
            id: itemUpdate.id,
            name: chemicalName,
            description: description,
            manufacturingDate: manufacturingDate,
            expirationDate: expirationDate,
            volumeAvailable: volumeAvailable,
            chemicalType: chemicalType,
        };

        if (!chemicalName || !chemicalType || !manufacturingDate || !expirationDate) {
            return showToastMessageFail("Please fill all required fields");
        }
        if (expirationDate < manufacturingDate) {
            return showToastMessageFail("Expiration date must be greater than manufacturing date");
        }
        if (volumeAvailable < 1) {
            return showToastMessageFail("Volume available must be greater than 0");
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/chemical/${chemicalType}`, {
                method: "PUT", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }, body: JSON.stringify(chemical),
            });
            if (!response.ok) throw new Error("Failed to create Chemical");
            const data = await response.json();
            if (!data) throw new Error("No data returned");
            showToastMessageSuccess("Chemical was updated!");
            setShowModal(false);

        } catch (error) {
            console.error(error);
            showToastMessageFail("Chemical cannot be added!");
            setShowModal(true);
        } finally {
            window.location.reload();
            refreshData((prev) => !prev);
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
                    UPDATE CHEMICAL
                </h4>

                {/* Select Type */}
                <Form.Group className="mb-2 group-3-column-create-plant">
                    <Form.Label className="text-label-login">Chemical Type</Form.Label>
                    <Form.Select
                        value={chemicalType}
                        onChange={(e) => setChemicalType(e.target.value)}
                        className="input-login input-addition input-plant-type-create-plant "
                    >
                        {chemicalTypesData && Array.isArray(chemicalTypesData) && chemicalTypesData.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>))}
                    </Form.Select>

                </Form.Group>

                {/* Name Chemical */}
                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">Name</Form.Label>
                    <Form.Control
                        className="input-login input-addition input-name-create-plant"
                        type="text"
                        placeholder="Rosa Orange Glow (Shrub Rose)"
                        value={chemicalName}
                        onChange={(e) => setChemicalName(e.target.value)}
                    />
                </Form.Group>


                {/* Description */}
                <Form.Group className="group-3-column-create-plant">
                    <Form.Label className="text-label-login">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        className=" input-addition input-characteristis-create-plant"
                        placeholder="Showy, Cut Flowers"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3} // Bạn có thể điều chỉnh số dòng hiển thị
                    />
                </Form.Group>


                {/* Manufacturing Date */}
                <Form.Group>
                    <Form.Label className="text-label-login">Manufacturing Date</Form.Label>
                    <Form.Control
                        className="input-login input-addition"
                        type="date"
                        placeholder="Acid, Alkaline, Neutral"
                        value={formatDate(manufacturingDate)}
                        onChange={(e) => setManufacturingDate(e.target.value)}
                    />
                </Form.Group>


                {/* Expiration Date */}
                <Form.Group>
                    <Form.Label className="text-label-login">Expiration Date</Form.Label>
                    <Form.Control
                        className="input-login input-addition"
                        type="date"
                        value={formatDate(expirationDate)}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        placeholder="Average"
                    />
                </Form.Group>


                {/* Volumne Available */}
                <Form.Group>
                    <Form.Label className="text-label-login">Volumne Available</Form.Label>
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

export default UpdateChemical;
