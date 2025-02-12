INSERT INTO chemical_type (type_id, type_description, type_name) value (3,
                                                                        'Herbicides are used to control unwanted weeds in gardens and lawns.',
                                                                        'Herbicides');

INSERT INTO chemical_type (type_id, type_description, type_name) value (1,
                                                                        'Fertilisers provide essential nutrients to plants, promoting healthy growth and vibrant blooms',
                                                                        'Fertilisers');

INSERT INTO chemical_type (type_id, type_description, type_name) value (2,
                                                                        ' Pesticides help control pests that can damage plants and reduce yields.',
                                                                        'Pesticides');


````
INSERT INTO agricultural_chemical (chemical_id, type_id, volume_available, expiration_date, manufacturing_date,
                                   chemical_description, chemical_name)
VALUES (1, 3, 100, '2022-12-31', '2022-01-01',
        'Weed killer for lawns and gardens',
        'Roundup'),
       (2, 1, 200, '2023-06-30', '2022-02-15', 'Fertilizer for all-purpose use', 'All-Purpose Fertilizer')
        ,
       (3, 2, 150, '2024-05-20', '2022-03-10', 'Pesticide for vegetable gardens', 'Veggie Pesticide')
        ,
       (4, 3, 80, '2025-01-01', '2022-04-05', 'Insecticide for fruit trees', 'Fruit Tree Insecticide')
        ,
       (5, 1, 100, '2025-12-31', '2022-05-01', 'Fungicide for lawn care', 'Lawn Fungicide');



