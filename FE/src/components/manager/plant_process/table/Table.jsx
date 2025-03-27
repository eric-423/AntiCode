import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Table.css";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";

const Table = ({
    listTitle,
    listItems,
    handleUpdateProcess,
    setItemUpdateId,
    setShowModalDetail,
    showModalDetail,

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
    setWaterVolumn,

}) => {

    const [itemsActive, setItemsActive] = useState([]);
    const [selectedProcess, setSelectedProcess] = useLocalStorage("manager_process_selected", "");

    const handleSelectItem = (item_index) => {
        setItemsActive([item_index.plantingProcessId]);
    };

    useEffect(() => {
        setSelectedProcess(itemsActive);
    }, [itemsActive, setSelectedProcess]);


    return (
        <>
            <Header listTitle={listTitle} />

            <div className="container-table-body">
                {listItems && listItems.length > 0 ? (
                    listItems.map((item, index) => (
                        <Body
                            key={item.plantingProcessId}
                            handleSelectItem={handleSelectItem}
                            itemsActive={itemsActive}
                            item={item}
                            index={index}
                            listTitle={listTitle}
                            handleUpdateProcess={handleUpdateProcess}
                            setItemUpdateId={setItemUpdateId}
                            setShowModalDetail={setShowModalDetail}
                            showModalDetail={showModalDetail}

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


                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>


        </>
    );
};
Table.propTypes = {
    listTitle: PropTypes.string.isRequired,
    listItems: PropTypes.array.isRequired,
    handleUpdateProcess: PropTypes.func.isRequired,
    setItemUpdateId: PropTypes.func.isRequired,
    setShowModalDetail: PropTypes.func.isRequired,
    showModalDetail: PropTypes.bool.isRequired,

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

export default Table;
