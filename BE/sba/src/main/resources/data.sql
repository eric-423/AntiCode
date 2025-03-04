INSERT INTO role (role_name)
VALUES ('Admin');
INSERT INTO role (role_name)
VALUES ('Manager');
INSERT INTO role (role_name)
VALUES ('Worker');

INSERT INTO plant_type (plant_type_name, type_description)
VALUES ('Fruit Trees', 'Trees that produce edible fruits.'),
       ('Ornamental Plants', 'Plants grown for decorative purposes in homes or gardens.'),
       ('Medicinal Plants', 'Plants that have healing properties.'),
       ('Industrial Plants', 'Plants cultivated for industrial raw materials.'),
       ('Shade Trees', 'Trees planted to provide shade in outdoor spaces.'),
       ('Herbs', 'Small plants often used in cooking and medicine.'),
       ('Cereal Crops', 'Plants grown for harvesting grains for food.'),
       ('Medicinal Herbs', 'Plants used for extracting pharmaceuticals.'),
       ('Hardwood Trees', 'Trees with large, hard trunks.'),
       ('Climbing Plants', 'Plants that have the ability to climb on surfaces.');

INSERT INTO plant (plant_name, quantity, price, size, is_seed, species, description, characteristics, attracts,
                   hardiness, heat_zones, plant_type_id)
VALUES ('Apple Tree', 15, 50.0, 'Medium', false, 'Malus domestica', 'A fruit tree that produces apples.',
        'Deciduous, flowering', 'Bees', 'USDA Zone 4-8', 'Heat Zone 5', 1),
       ('Rose', 30, 20.5, 'Small', false, 'Rosa', 'A beautiful flowering plant.', 'Thorny stems, fragrant',
        'Butterflies', 'USDA Zone 3-9', 'Heat Zone 6', 2),
       ('Basil', 100, 5.0, 'Small', true, 'Ocimum basilicum', 'A popular culinary herb.', 'Aromatic leaves', 'Bees',
        'USDA Zone 10-11', 'Heat Zone 7', 3),
       ('Oak Tree', 5, 200.0, 'Large', false, 'Quercus', 'A large tree known for its strength.',
        'Deciduous, broad leaves', 'Squirrels', 'USDA Zone 3-9', 'Heat Zone 4', 4),
       ('Tomato', 50, 10.0, 'Medium', true, 'Solanum lycopersicum', 'A widely grown vegetable.', 'Juicy, red fruits',
        'Hummingbirds', 'USDA Zone 10-11', 'Heat Zone 7', 3),
       ('Lavender', 25, 15.0, 'Small', false, 'Lavandula', 'A fragrant herb used in aromatherapy.', 'Purple flowers',
        'Bees', 'USDA Zone 5-9', 'Heat Zone 6', 2),
       ('Cactus', 20, 30.0, 'Small', false, 'Cactaceae', 'A succulent plant that thrives in dry conditions.',
        'Spines instead of leaves', 'Hummingbirds', 'USDA Zone 9-11', 'Heat Zone 10', 5),
       ('Pine Tree', 10, 150.0, 'Large', false, 'Pinus', 'An evergreen tree that produces cones.', 'Needle-like leaves',
        'Birds', 'USDA Zone 3-7', 'Heat Zone 4', 4),
       ('Mint', 75, 8.0, 'Small', true, 'Mentha', 'A refreshing herb used in cooking and teas.', 'Fragrant leaves',
        'Bees', 'USDA Zone 3-11', 'Heat Zone 6', 3),
       ('Sunflower', 40, 12.0, 'Medium', true, 'Helianthus annuus', 'A tall plant known for its large flowers.',
        'Bright yellow petals', 'Bees', 'USDA Zone 2-11', 'Heat Zone 5', 1);

INSERT INTO farm (farm_name, farm_extent, farm_address, farm_length, farm_width, is_deleted)
VALUES ('Sunny Acres', 50.0, '123 Sunny Lane, Springfield', 10.0, 5.0),
       ('Green Valley Farm', 75.5, '456 Green Valley Road, Springfield', 15.0, 5.0, false),
       ('Riverbend Farm', 30.0, '789 Riverbend Drive, Springfield', 8.0, 3.75, false),
       ('Mountain View Farm', 100.0, '101 Mountain View Ave, Springfield', 20.0, 5.0, false),
       ('Cedar Grove Farm', 40.0, '202 Cedar Grove St, Springfield', 8.0, 5.0, false),
       ('Willow Creek Farm', 60.0, '303 Willow Creek Blvd, Springfield', 12.0, 5.0, false),
       ('Maple Leaf Farm', 80.0, '404 Maple Leaf Way, Springfield', 16.0, 5.0, false),
       ('Golden Harvest Farm', 90.0, '505 Golden Harvest Rd, Springfield', 18.0, 5.0, false),
       ('Happy Fields Farm', 70.0, '606 Happy Fields Ct, Springfield', 14.0, 5.0, false),
       ('Blue Sky Farm', 55.0, '707 Blue Sky Dr, Springfield', 11.0, 5.0, false);


INSERT INTO area (area_name, area_extent, area_length, area_width, farm_id, is_deleted)
VALUES ('North Field', 20.0, 5.0, 4.0, 1, false),
       ('South Field', 25.0, 5.0, 5.0, 1,false),
       ('East Meadow', 15.0, 5.0, 3.0, 2,false),
       ('West Pasture', 30.0, 5.0, 6.0, 2,false),
       ('Main Crop Area', 40.0, 5.0, 8.0, 3,false),
       ('Orchard', 10.0, 5.0, 2.0, 4,false),
       ('Vegetable Patch', 12.5, 5.0, 2.5, 5,false),
       ('Flower Garden', 8.0, 4.0, 2.0, 6,false),
       ('Herb Section', 5.0, 5.0, 1.0, 7,false),
       ('Livestock Area', 35.0, 5.0, 7.0, 8,false);


INSERT INTO location (location_id, location_extent, location_name, area_id, location_width, location_length, is_deleted)
VALUES (1, 5.0, 'North Corner', 1, 2.0, 2.5,false),
       (2, 10.0, 'South Corner', 1, 3.0, 3.33,false),
       (3, 8.0, 'East Edge', 2, 2.5, 3.2,false),
       (4, 12.0, 'West Edge', 2, 4.0, 3.0,false),
       (5, 4.0, 'Central Spot', 3, 1.5, 2.67,false),
       (6, 6.5, 'Orchard Section', 4, 2.0, 3.25,false),
       (7, 3.0, 'Vegetable Area', 5, 1.0, 3.0,false),
       (8, 2.5, 'Flower Bed', 6, 1.0, 2.5,false),
       (9, 7.0, 'Herb Patch', 7, 2.0, 3.5,false),
       (10, 11.0, 'Livestock Pen', 8, 3.5, 3.14,false);

INSERT INTO planting_location (plant_location_id, plant_id, location_id, start_date, end_date, is_harvest, is_deleted)
VALUES (1, 1, 1, '2023-01-01', '2023-06-01', false,false),
       (2, 2, 1, '2023-02-01', '2023-07-01', false,false),
       (3, 1, 2, '2023-03-01', '2023-08-01', true,false),
       (4, 3, 3, '2023-04-01', '2023-09-01', false,false),
       (5, 2, 4, '2023-05-01', '2023-10-01', true,false),
       (6, 1, 5, '2023-06-01', '2023-11-01', false,false),
       (7, 3, 6, '2023-07-01', '2023-12-01', true,false),
       (8, 2, 7, '2023-08-01', '2023-12-15', false,false),
       (9, 1, 8, '2023-09-01', '2023-10-01', true,false),
       (10, 3, 9, '2023-10-01', '2023-11-01', false,false);

INSERT INTO plant_medium (medium_id, medium_name, description, medium_weight_avallable)
VALUES (1, 'Coco Peat', 'A natural fiber made from coconut husks.', 50),
       (2, 'Perlite', 'A volcanic glass that is expanded by heating.', 30),
       (3, 'Vermiculite', 'A hydrous phyllosilicate mineral that undergoes significant expansion when heated.', 25),
       (4, 'Soil Mix', 'A blend of soil and organic materials for planting.', 40),
       (5, 'Hydroponic Medium', 'An inert medium used in hydroponic systems.', 60);

INSERT INTO plant_pot (pot_id, pot_size, pot_material, pot_quantity_available)
VALUES (1, 'Small Pot', 'Plastic', 100),
       (2, 'Medium Pot', 'Clay', 200),
       (3, 'Large Pot', 'Ceramic', 300),
       (4, 'Hanging Pot', 'Metal', 150),
       (5, 'Square Pot', 'Fiberglass', 250);



INSERT INTO task_status (status_name, status_description, is_deleted)
VALUES ('Initial', 'Task has been created and is in its initial planning stage.', 0),
       ('Ready', 'Task is fully planned and ready to be started.', 0),
       ('On Progress', 'Task is currently being worked on.', 0),
       ('Needs Review', 'Task has been completed but requires review or approval.', 0),
       ('Done', 'Task has been completed but may still need final verification.', 0),
       ('Completed', 'Task has been fully completed and verified.', 0);

INSERT INTO task_type (type_description, type_name, is_deleted)
VALUES ('Planting seeds directly into garden soil.', 'Seed Sowing (Direct)', 0),
       ('Starting seeds indoors for later transplanting.', 'Seed Sowing (Indoor)', 0),
       ('Moving seedlings or established plants to a new location.', 'Transplanting', 0),
       ('Planting bulbs.', 'Bulb Planting', 0),
       ('Taking cuttings to grow new plants.', 'Cutting Propagation', 0),
       ('Dividing established plants to create new ones.', 'Division', 0),
       ('Joining parts of two plants to grow as one.', 'Grafting', 0),
       ('Rooting a stem while still attached to the parent plant.', 'Layering', 0),
       ('Planting sapling or mature trees.', 'Planting (Tree)', 0),
       ('Planting bushes.', 'Planting (Shrub)', 0),
       ('Planting in pots or other containers.', 'Planting (Container)', 0),
       ('Providing water to plants.', 'Watering', 0),
       ('Applying nutrients to plants.', 'Fertilizing', 0),
       ('Removing unwanted plants.', 'Weeding', 0),
       ('Cutting back overgrown or dead branches.', 'Pruning', 0),
       ('Removing spent flowers.', 'Deadheading', 0),
       ('Applying mulch to the soil surface.', 'Mulching', 0),
       ('Adding materials to improve soil quality.', 'Soil Amendment', 0),
       ('Providing support for climbing or tall plants.', 'Trellising/Staking', 0),
       ('Applying fungicides or other treatments.', 'Disease Control', 0),
       ('Gathering mature fruits, vegetables, or flowers.', 'Harvesting', 0),
       ('Managing and turning compost.', 'Composting', 0),
       ('Maintaining the irrigation system.', 'Irrigation System Maintenance', 0),
       ('Clearing fallen leaves.', 'Leaf Removal', 0),
       ('Clearing dead plant matter and other debris.', 'Debris Removal', 0),
       ('Clearing out old plants and preparing beds for new plantings.', 'Bed Clearing (Seasonal)', 0),
       ('Preparing soil for planting.', 'Bed Preparation', 0),
       ('Testing the soil''s pH and nutrient levels.', 'Soil Testing', 0),
       ('Creating a map of the garden.', 'Garden Mapping', 0),
       ('Checking for signs of pests.', 'Pest Monitoring', 0),
       ('Checking for signs of disease.', 'Disease Monitoring', 0),
       ('Observing plant growth.', 'Growth Monitoring', 0),
       ('Keeping track of weather conditions.', 'Weather Monitoring', 0),
       ('Building raised garden beds.', 'Raised Bed Construction', 0),
       ('Building fences.', 'Fence Construction', 0),
       ('Building garden paths.', 'Path Construction', 0),
       ('Maintaining the greenhouse.', 'Greenhouse Maintenance', 0);

INSERT INTO water (water_name, purity, ph_level, volume_available, is_deleted)
VALUES ('Water 1', 1, 1, 100, 0),
       ('Water 2', 2, 2, 90, 0),
       ('Water 3', 3, 3, 80, 0),
       ('Water 4', 4, 4, 70, 0),
       ('Water 5', 5, 5, 60, 0);
