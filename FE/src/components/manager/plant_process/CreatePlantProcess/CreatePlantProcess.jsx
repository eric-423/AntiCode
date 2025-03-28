import { PropTypes } from 'prop-types';
import ICONS from '../../../../constant/Image';
import { Button, Form } from 'react-bootstrap';

const CreatePlantProcess = ({
    setShowModalCreatePlantProcess,
    handleCreatePlantProcess,

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
    setNameProcess,
    setDescriptionProcess,
    setPlantSelectId,
    setMediumWeight,
    setChemicalVolumn,
    setWaterVolumn
}) => {

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

                    <Form.Group className='group-3-column-create-plant'>

                        <Form.Label className="text-label-login w-100">Process Name</Form.Label>


                        <Form.Control
                            className="input-login input-addition  w-100"
                            type="text"
                            placeholder="Rosa Orange Glow (Shrub Rose)"
                            onChange={(e) => setNameProcess(e.target.value)}
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

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Medium</Form.Label>
                        <div className="d-flex gap-2">
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
                                onChange={(e) => setMediumWeight(e.target.value)}
                            />
                        </div>

                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Chemical</Form.Label>
                        <div className="d-flex gap-2">

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
                                placeholder="Chemical Volume"
                                onChange={(e) => setChemicalVolumn(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    {/* ------------------------------------------------------------ */}

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Water</Form.Label>
                        <div className="d-flex gap-2">
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
                                onChange={(e) => setWaterVolumn(e.target.value)}
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
                            onChange={(e) => setDescriptionProcess(e.target.value)}
                        />


                    </Form.Group>


                    <Button
                        onClick={handleCreatePlantProcess}
                        className="new-plant-process-button button-create-process"
                        style={{ minWidth: 100, minHeight: 60, fontWeight: 'bold', border: 'none' }}

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