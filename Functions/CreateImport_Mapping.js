import { checkElementTypeWithPaths } from "./CheckElementTypeWithPaths.js";
import mendixmodelsdk_1 from "mendixmodelsdk";
function CreateImport_Mapping(
  model,
  modules,
  json,
  moduleName,
  Json_Structure
) {
  const elementTypesWithPaths = checkElementTypeWithPaths(json);
  var path = [];
  var JSONElements = [];
  for (let i = 0; i < Object.keys(elementTypesWithPaths).length; i++) {
    let name =
      Object.values(elementTypesWithPaths)[i].key === "0"
        ? Object.values(elementTypesWithPaths)[i - 1].key + "Item"
        : Object.values(elementTypesWithPaths)[i].key;
    let name2 =
      i > 0
        ? Object.values(elementTypesWithPaths)[i - 1].key === "0"
          ? Object.values(elementTypesWithPaths)[i - 2].key + "Item"
          : Object.values(elementTypesWithPaths)[i - 1].key
        : null;

    path.push({
      path:
        "(Object)|" +
        Object.keys(elementTypesWithPaths)
          [i].replaceAll(".", "|")
          .replaceAll("0", "(Object)"),
      value: Object.values(elementTypesWithPaths)[i].value,
      name: name,
      type: Object.values(elementTypesWithPaths)[i].type,
      level: Object.values(elementTypesWithPaths)[i].i,
      entityPath:
        Object.values(elementTypesWithPaths)[i].type === "string"
          ? name2 + "." + name
          : name2
          ? name + "_" + name2
          : name + "_Root",
    });
  }
  var stringType = mendixmodelsdk_1.datatypes.StringType.create(model);
  path.forEach((element) => {
    element.path;

    var importValueMappingElement =
      element.type === "string"
        ? mendixmodelsdk_1.importmappings.ImportValueMappingElement.create(
            model
          )
        : mendixmodelsdk_1.importmappings.ImportObjectMappingElement.create(
            model
          );
    importValueMappingElement.elementType =
      element.type === "string"
        ? mendixmodelsdk_1.mappings.ElementType.Value
        : element.type === "Array"
        ? mendixmodelsdk_1.mappings.ElementType.Array
        : mendixmodelsdk_1.mappings.ElementType.Object;
    importValueMappingElement.jsonPath = element.path;
    importValueMappingElement.maxOccurs = element.type === "Object" ? -1 : 1;
    importValueMappingElement.nillable = true;

    importValueMappingElement.exposedName = element.name;
    if (element.type === "string") {
      importValueMappingElement.type = stringType;
      importValueMappingElement.xmlPrimitiveType =
        mendixmodelsdk_1.xmlschemas.XmlPrimitiveType.String;
      importValueMappingElement.maxLength = 0;
      importValueMappingElement.originalValue = element.value;
      importValueMappingElement.attribute =
        modules.findAttributeByQualifiedName(
          moduleName + "." + element.entityPath
        );
    }
    importValueMappingElement.entity = modules.findEntityByQualifiedName(
      moduleName + "." + element.name
    );
    importValueMappingElement.association =
      modules.findAssociationBaseByQualifiedName(
        moduleName + "." + element.entityPath
      );
    JSONElements.push(importValueMappingElement);
  });
  var arry = JSONElements.reverse();

  for (let i = 0; i < arry.length; i++) {
    for (let j = 0; j < arry.length; j++) {
      var str = arry[i].jsonPath;
      var lastIndex = str.lastIndexOf("|");
      str = str.substring(0, lastIndex);
      if (str === arry[j].jsonPath) {
        arry[j].children.push(arry[i]);
      }
    }
  }

  var importObjectMappingElement =
    mendixmodelsdk_1.importmappings.ImportObjectMappingElement.create(model);
  importObjectMappingElement.elementType =
    mendixmodelsdk_1.mappings.ElementType.Object;
  importObjectMappingElement.jsonPath = "(Object)";
  importObjectMappingElement.minOccurs = 1;
  importObjectMappingElement.maxOccurs = 1;
  importObjectMappingElement.nillable = true;
  importObjectMappingElement.exposedName = "Root";
  importObjectMappingElement.entity =
    modules.findEntityByQualifiedName("SDKModule.Root");

  importObjectMappingElement.children.push(arry[arry.length - 1]);

  var unknownType = mendixmodelsdk_1.datatypes.UnknownType.create(model);

  var import_mapping =
    mendixmodelsdk_1.importmappings.ImportMapping.createIn(model);
  import_mapping.name = "Import_mapping";
  import_mapping.rootMappingElements.push(importObjectMappingElement);
  import_mapping.jsonStructure = Json_Structure;
  import_mapping.parameterType = unknownType;
  return import_mapping;
}

export { CreateImport_Mapping };
