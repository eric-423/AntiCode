import { PropTypes } from 'prop-types';
import ICONS from '../../../../constant/Image';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const UpdateProcess = ({
    handleUpdateProcess,
    setShowModalDetail,
    setItemUpdateId,

    setNameProcess,
    setDescriptionProcess,
    setPlantSelectId,
    setPlantMediumSelectId,
    setPlantPotSelectId,
    setSelectedFarmingEquipment,
    setSelectedPlantChemical,
    setSelectedPlantWater,
    plantData,
    plantMedium,
    plantPot,
    plantChemical,
    plantWater,
    farmingEquipment,
    setMediumWeight,
    setChemicalVolumn,
    setWaterVolumn,
    itemUpdate
}) => {

    const [processName, setProcessName] = useState(itemUpdate.plantingProcessName);
    const [processDescription, setProcessDescription] = useState(itemUpdate.plantingProcessDescription);
    const [selectedPlant, setSelectedPlant] = useState(itemUpdate.plantId);
    const [selectedMedium, setSelectedMedium] = useState(itemUpdate.plantingMediumProcessDTO.plantingMediumId);
    const [selectedPot, setSelectedPot] = useState(itemUpdate.plantingPotProcessDTO.plantingPotId);
    const [selectedEquipment, setSelectedEquipment] = useState(itemUpdate.farmingEquipmentProcessDTO.equipmentId);
    const [selectedChemical, setSelectedChemical] = useState(itemUpdate.chemicalProcessDTO.chemicalId);
    const [selectedWater, setSelectedWater] = useState(itemUpdate.waterProcessDTO.waterId);
    const [mediumWeightValue, setMediumWeightValue] = useState(itemUpdate.plantingMediumProcessDTO.plantingMediumWeight);
    const [chemicalVolumeValue, setChemicalVolumeValue] = useState(itemUpdate.chemicalProcessDTO.chemicalVolume);
    const [waterVolumeValue, setWaterVolumeValue] = useState(itemUpdate.waterProcessDTO.volume);

    useEffect(() => {
        setItemUpdateId(itemUpdate.plantingProcessId);
        setNameProcess(processName);
        setDescriptionProcess(processDescription);
        setPlantSelectId(selectedPlant);
        setPlantMediumSelectId(selectedMedium);
        setPlantPotSelectId(selectedPot);
        setSelectedFarmingEquipment(selectedEquipment);
        setSelectedPlantChemical(selectedChemical);
        setSelectedPlantWater(selectedWater);
        setMediumWeight(mediumWeightValue);
        setChemicalVolumn(chemicalVolumeValue);
        setWaterVolumn(waterVolumeValue);
    }, [processName, processDescription, selectedPlant, selectedMedium, selectedPot, selectedEquipment, selectedChemical, selectedWater, mediumWeightValue, chemicalVolumeValue, waterVolumeValue]);

    return (
        <div className='container-create-plant-process' >
            <div className='modal-create-plant m-0'>
                <img
                    className="icon-close"
                    onClick={() => setShowModalDetail(false)}
                    src={ICONS.icon_close}
                    alt="Close"
                />
                <Form className="form-addition-plant-type form-create-plant" style={{ overflowY: 'auto' }} >
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        Detail Process
                    </h4>
                    <Form.Group className='group-3-column-create-plant'>

                        <Form.Label className="text-label-login w-100">Process Name</Form.Label>

                        <Form.Control
                            className="input-login input-addition  w-100"
                            type="text"
                            value={processName}
                            placeholder="Rosa Orange Glow (Shrub Rose)"
                            onChange={(e) => setProcessName(e.target.value)}
                        />

                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Plant Name</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            value={selectedPlant}
                            onChange={(e) => setSelectedPlant(e.target.value)}
                        >
                            <option value="">Select Plant</option>
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
                        <Form.Label className="text-label-login">Plant Pot</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            value={selectedPot}
                            onChange={(e) => setSelectedPot(e.target.value)}
                        >
                            <option value="">Select Plant Pot</option>
                            {
                                plantPot.map((item) => (
                                    <option
                                        key={item.plantingPotId}
                                        value={item.plantingPotId}
                                    >
                                        {item.potSize} - {item.potMaterial} - {item.potQuantityAvailable}
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
                            value={selectedEquipment}
                            onChange={(e) => setSelectedEquipment(e.target.value)}
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

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Plant Medium</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Select
                                className="input-login input-addition"
                                value={selectedMedium}
                                onChange={(e) => setSelectedMedium(e.target.value)}
                            >
                                <option value="">Select Plant Medium</option>
                                {
                                    plantMedium.map((item) => (
                                        <option
                                            key={item.mediumId}
                                            value={item.mediumId}
                                        >
                                            {item.mediumName} - {item.mediumWeightAvailable}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                            <input
                                className="input-login input-addition input-medium-weight rounded-1 border-1"
                                style={{ maxWidth: '90px', outline: 'none' }}
                                type="number"
                                min={0}
                                max={10}
                                required
                                placeholder="Medium Weight"
                                value={mediumWeightValue}
                                onChange={(e) => setMediumWeightValue(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Plant Chemical</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Select
                                className="input-login input-addition"
                                value={selectedChemical}
                                onChange={(e) => setSelectedChemical(e.target.value)}
                            >
                                <option value="">Select Plant Chemical</option>
                                {
                                    plantChemical.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name} - {item.chemicalType} - {item.volumeAvailable}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                            <input
                                className="input-login input-addition input-medium-weight rounded-1 border-1"
                                style={{ maxWidth: '90px', outline: 'none' }}
                                type="number"
                                min={0}
                                max={10}
                                required
                                value={chemicalVolumeValue}
                                placeholder="Chemical Volume"
                                onChange={(e) => setChemicalVolumeValue(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Plant Water</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Select
                                className="input-login input-addition"
                                value={selectedWater}
                                onChange={(e) => setSelectedWater(e.target.value)}
                            >
                                <option value="">Select Plant Water</option>
                                {
                                    plantWater.map((item) => (
                                        <option
                                            key={item.waterId}
                                            value={item.waterId}
                                        >
                                            {item.waterName} - ph: {item.phlevel} - purity: {item.purity} - volumn: {item.volumeAvailable}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                            <input
                                className="input-login input-addition input-medium-weight rounded-1 border-1"
                                style={{ maxWidth: '90px', outline: 'none' }}
                                type="number"
                                min={0}
                                max={10}
                                required
                                placeholder="Water Volume"
                                value={waterVolumeValue}
                                onChange={(e) => setWaterVolumeValue(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">
                        <Form.Label className="text-label-login">Description</Form.Label>

                        <Form.Control
                            className="input-login input-addition h-100 w-100"
                            as="textarea"
                            rows={7}
                            placeholder="Showy, Cut Flowers"
                            value={processDescription}
                            onChange={(e) => setProcessDescription(e.target.value)}
                        />

                    </Form.Group>

                    <Button
                        onClick={handleUpdateProcess}
                        className="new-plant-process-button button-create-process"
                        style={{ minWidth: 100, minHeight: 60, fontWeight: 'bold', border: 'none' }}
                    >
                        Save Changes
                    </Button>
                </Form>
            </div>
        </div>
    )
}

UpdateProcess.propTypes = {
    handleUpdateProcess: PropTypes.func.isRequired,
    setShowModalDetail: PropTypes.func.isRequired,
    setPlantSelectId: PropTypes.func.isRequired,
    plantMedium: PropTypes.array.isRequired,
    setPlantMediumSelectId: PropTypes.func.isRequired,
    plantPot: PropTypes.array.isRequired,
    setPlantPotSelectId: PropTypes.func.isRequired,
    plantChemical: PropTypes.array.isRequired,
    setSelectedPlantChemical: PropTypes.func.isRequired,
    plantWater: PropTypes.array.isRequired,
    setSelectedPlantWater: PropTypes.func.isRequired,
    farmingEquipment: PropTypes.array.isRequired,
    setSelectedFarmingEquipment: PropTypes.func.isRequired,
    setNameProcess: PropTypes.func.isRequired,
    setDescriptionProcess: PropTypes.func.isRequired,
    setMediumWeight: PropTypes.func.isRequired,
    setChemicalVolumn: PropTypes.func.isRequired,
    setWaterVolumn: PropTypes.func.isRequired,
    itemUpdate: PropTypes.object.isRequired,
    plantData: PropTypes.array.isRequired,
    setItemUpdateId: PropTypes.func.isRequired
}

export default UpdateProcess