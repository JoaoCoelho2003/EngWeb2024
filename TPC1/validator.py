import os
from xmlschema import XMLSchema
from xmlschema import XMLSchemaValidationError

schema = XMLSchema('MapaRuas-materialBase/MRB-rua.xsd')

xml_folder = 'MapaRuas-materialBase/texto'

validation_errors = []

for file_name in os.listdir(xml_folder):
    if file_name.endswith('.xml'):
        file_path = os.path.join(xml_folder, file_name)
        try:
            schema.validate(file_path)
        except XMLSchemaValidationError as e:
            error_message = str(e).split('\n', 1)[0]
            validation_errors.append(f"Validation error in file '{file_name}': {error_message}")

if validation_errors:
    for error in validation_errors:
        print(error)
else:
    print("All XML files are valid according to the schema.")
