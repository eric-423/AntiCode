import { PropTypes } from 'prop-types';
import ICONS from '../../../../constant/Image';
import { Form } from 'react-bootstrap';
import { useState } from 'react';


const CreatePlantProcess = ({ setShowModalCreatePlantProcess, plantData, handleSelectPlantId }) => {

    const [plantName, setPlantName] = useState('');


    return (
        <div className='container-create-plant-process'>

            <img
                className="icon-close"
                onClick={() => setShowModalCreatePlantProcess(false)}
                src={ICONS.icon_close}
                alt="Close"
            />

            <div>
                <Form className="form-addition-plant-type form-create-plant">
                    <h4 className="addition-plant-type-h4 group-3-column-create-plant">
                        NEW PLANT PROCESS
                    </h4>

                    <Form.Group className="group-3-column-create-plant">

                        <Form.Label className="text-label-login">Plant Name</Form.Label>

                        <Form.Select
                            className="input-login input-addition"
                            value={plantName}
                            onChange={(e) => setPlantName(e.target.value)}
                        >

                            <option value="">Select Plant Name</option>
                            {
                                plantData.map((item) => (
                                    <option key={item.plantId} value={item.plantId} onClick={() => handleSelectPlantId(item.plantId)}>
                                        {item.plantName}
                                    </option>
                                ))
                            }
                        </Form.Select>





                    </Form.Group>

                </Form>
            </div>
        </div>

    )
}


CreatePlantProcess.propTypes = {
    setShowModalCreatePlantProcess: PropTypes.func.isRequired,
    plantData: PropTypes.array.isRequired,
    handleSelectPlantId: PropTypes.func.isRequired
}

export default CreatePlantProcess