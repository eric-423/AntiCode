import PropTypes from 'prop-types';
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar.jsx";
import Filter from "../../../common/filter/Filter.jsx";
import useLocalStorage from "use-local-storage";
import CreatePlantProcess from "../CreatePlantProcess/CreatePlantProcess.jsx";

const ToolBar = ({
    setShowModalCreatePlantProcess,
    showModalCreatePlantProcess,
    onClose,
    handleCreatePlantProcess,
    handleShowModalCreatePlantProcess,

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


    const [selectEquipment, setSelectEquipment] = useLocalStorage("manager_equipment_selected", "");

    return (
        <div className="tool-bar-plant">
            <Filter />
            <div className="right-tool-bar-plant">
                <SearchBar />
                <div
                    // onClick={() => handleDeleteEquipment()}
                    className={selectEquipment && selectEquipment.length > 0 ? "plant-button delete-plant-button-active" : "plant-button delete-plant-button-non-active"}>
                    Delete
                </div>

                <div
                    className="plant-button new-plant-button"
                    onClick={(e) => handleShowModalCreatePlantProcess(e)}
                >
                    Create New Process
                </div>
            </div>


            {showModalCreatePlantProcess && <CreatePlantProcess
                setShowModalCreatePlantProcess={setShowModalCreatePlantProcess}
                onClose={onClose}
                handleCreatePlantProcess={handleCreatePlantProcess}

                plantData={plantData}
                plantMedium={plantMedium}
                setPlantMediumSelectId={setPlantMediumSelectId}
                plantPot={plantPot}
                setPlantPotSelectId={setPlantPotSelectId}
                plantChemical={plantChemical}
                setSelectedPlantChemical={setSelectedPlantChemical}
                plantWater={plantWater}
                setSelectedPlantWater={setSelectedPlantWater}
                farmingEquipment={farmingEquipment}
                setSelectedFarmingEquipment={setSelectedFarmingEquipment}
                setNameProcess={setNameProcess}
                setDescriptionProcess={setDescriptionProcess}
                setPlantSelectId={setPlantSelectId}
                setMediumWeight={setMediumWeight}
                setChemicalVolumn={setChemicalVolumn}
                setWaterVolumn={setWaterVolumn}
            />}
        </div>
    );
};
ToolBar.propTypes = {
    setShowModalCreatePlantProcess: PropTypes.func.isRequired,
    showModalCreatePlantProcess: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleCreatePlantProcess: PropTypes.func.isRequired,
    handleShowModalCreatePlantProcess: PropTypes.func.isRequired,

    plantData: PropTypes.array.isRequired,
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
    setPlantSelectId: PropTypes.func.isRequired,
    setMediumWeight: PropTypes.func.isRequired,
    setChemicalVolumn: PropTypes.func.isRequired,
    setWaterVolumn: PropTypes.func.isRequired,
};

export default ToolBar;
