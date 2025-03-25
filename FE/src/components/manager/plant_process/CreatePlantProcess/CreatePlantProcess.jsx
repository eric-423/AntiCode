import { PropTypes } from 'prop-types';
import ICONS from '../../../../constant/Image';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import LOCALSTORAGE from '../../../../constant/localStorage';

const CreatePlantProcess = ({
    setShowModalCreatePlantProcess,
    plantData,
    plantMedium,
    setPlantMediumSelectId,
    plantPot,
    setPlantPotSelectId,
    plantChemical,
    setSelectedPlantChemical,
    plantWater,
    setSelectedPlantWater,
    farmingEquipment,
    setSelectedFarmingEquipment,
    handleCreatePlantProcess,
    setNameProcess,
    setDescriptionProcess,
    setPlantSelectId,
    setMediumWeight,
    setChemicalVolumn,
    setWaterVolumn
}) => {
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');
    const [plantName, setPlantName] = useState('');

    useEffect(() => {
        setToken(atob(auth));
    }, [auth])


    console.log(plantMedium)

    return (
        <div className='container-create-plant-process' >
            <div className='modal-create-plant m-0'>
                <img
                    className="icon-close"
                    onClick={() => setShowModalCreatePlantProcess(false)}
                    src={ICONS.icon_close}
                    alt="Close"
                />
                <Form className="form-addition-plant-type form-create-plant" style={{ overflowY: 'auto' }} >
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        NEW PLANT PROCESS
                    </h4>

                    <Form.Group >

                        <Form.Label className="text-label-login">Process Name</Form.Label>


                        <Form.Control
                            className="input-login input-addition input-name-create-plant"
                            type="text"
                            placeholder="Rosa Orange Glow (Shrub Rose)"
                            onChange={(e) => setNameProcess(e.target.value)}
                        />


                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">


                        <Form.Label className="text-label-login">Description</Form.Label>

                        <Form.Control
                            className="input-addition input-characteristis-create-plant"
                            as="textarea"
                            rows={3}
                            placeholder="Showy, Cut Flowers"
                            onChange={(e) => setDescriptionProcess(e.target.value)}
                        />


                    </Form.Group>


                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Name</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            onChange={(e) => setPlantSelectId(e.target.value)}
                        >

                            <option value="">Select Plant Name</option>

                            {
                                plantData.map((item) => (
                                    <option
                                        key={item.plantId}
                                        value={item.plantId}
                                    >

                                        {item.plantName}

                                    </option>
                                ))
                            }

                        </Form.Select>


                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Medium</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            onChange={(e) => setPlantMediumSelectId(e.target.value)}
                        >
                            <option value="">Select Plant Medium</option>
                            {
                                plantMedium.map((item) => (
                                    <option
                                        key={item.mediumId}
                                        value={item.mediumId}
                                        onChange={setMediumWeight(item.mediumWeightAvailable)}
                                    >
                                        {item.mediumName}
                                    </option>
                                ))
                            }

                        </Form.Select>

                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Pot</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            onChange={(e) => setPlantPotSelectId(e.target.value)}
                        >
                            <option value="">Select Plant Pot</option>
                            {
                                plantPot.map((item) => (
                                    <option
                                        key={item.potId}
                                        value={item.potId}
                                    >
                                        {item.potSize} - {item.potMaterial} - {item.potQuantityAvailable}
                                    </option>
                                ))
                            }

                        </Form.Select>

                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Chemical</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            onChange={(e) => setSelectedPlantChemical(e.target.value)}
                        >
                            <option value="">Select Plant Chemical</option>
                            {
                                plantChemical.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                        onChange={setChemicalVolumn(item.volumeAvailable)}
                                    >
                                        {item.name} - {item.chemicalType} - {item.volumeAvailable}
                                    </option>
                                ))
                            }

                        </Form.Select>

                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Water</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            onChange={(e) => setSelectedPlantWater(e.target.value)}
                        >
                            <option value="">Select Plant Water</option>
                            {
                                plantWater.map((item) => (
                                    <option
                                        key={item.waterId}
                                        value={item.waterId}
                                        onChange={setWaterVolumn(item.volumeAvailable)}
                                    >
                                        {item.waterName} - ph: {item.phlevel} - purity: {item.purity} - volumn: {item.volumeAvailable}
                                    </option>
                                ))
                            }

                        </Form.Select>

                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Equipment</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            onChange={(e) => setSelectedFarmingEquipment(e.target.value)}
                        >
                            <option value="">Select Plant Equipment</option>
                            {
                                farmingEquipment.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name} - {item.typeName} - {item.quantity}
                                    </option>
                                ))
                            }

                        </Form.Select>

                    </Form.Group>


                    <Button
                        onClick={handleCreatePlantProcess}
                        className="button-create-plant"
                    >
                        Create Plant
                    </Button>
                </Form>
            </div>
        </div >

    )
}


CreatePlantProcess.propTypes = {
    setShowModalCreatePlantProcess: PropTypes.func.isRequired,
    plantData: PropTypes.array.isRequired,
    setPlantSelectId: PropTypes.func.isRequired,
    plantMedium: PropTypes.array.isRequired,
    setPlantMediumSelectId: PropTypes.func.isRequired,
    plantPot: PropTypes.array.isRequired,
    setPlantPotSelectId: PropTypes.func.isRequired,
    plantChemical: PropTypes.array.isRequired,
    setSelectedPlantChemical: PropTypes.func.isRequired,
    plantWater: PropTypes.array.isRequired,
    setSelectedPlantWater: PropTypes.string.isRequired,
    farmingEquipment: PropTypes.array.isRequired,
    setSelectedFarmingEquipment: PropTypes.string.isRequired,
    handleCreatePlantProcess: PropTypes.func.isRequired,
    setNameProcess: PropTypes.func.isRequired,
    setDescriptionProcess: PropTypes.func.isRequired,
    setMediumWeight: PropTypes.func.isRequired,
    setChemicalVolumn: PropTypes.func.isRequired,
    setWaterVolumn: PropTypes.func.isRequired
}

export default CreatePlantProcess