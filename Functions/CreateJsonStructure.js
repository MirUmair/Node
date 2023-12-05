import { checkElementTypeWithPaths } from "./CheckElementTypeWithPaths.js";
import mendixmodelsdk_1 from "mendixmodelsdk";

function CreateJson_Structure(json, model) {
  const elementTypesWithPaths = checkElementTypeWithPaths(json);
  var path = [];
  var JSONElements = [];
  for (let i = 0; i < Object.keys(elementTypesWithPaths).length; i++) {
    path.push({
      path:
        "(Object)|" +
        Object.keys(elementTypesWithPaths)
          [i].replaceAll(".", "|")
          .replaceAll("0", "(Object)"),
      value: Object.values(elementTypesWithPaths)[i].value,
      name:
        Object.values(elementTypesWithPaths)[i].key === "0"
          ? Object.values(elementTypesWithPaths)[i - 1].key + "Item"
          : Object.values(elementTypesWithPaths)[i].key,
      type: Object.values(elementTypesWithPaths)[i].type,
      level: Object.values(elementTypesWithPaths)[i].i,
    });
  }
  path.forEach((element) => {
    var jsonElement = mendixmodelsdk_1.jsonstructures.JsonElement.create(model);
    jsonElement.path = element.path;
    jsonElement.minOccurs = 0;
    jsonElement.nillable = true;
    jsonElement.exposedName = element.name;
    if (element.type === "string") {
      jsonElement.primitiveType =
        mendixmodelsdk_1.xmlschemas.XmlPrimitiveType.String;
      jsonElement.originalValue = JSON.stringify(element.value);
      jsonElement.maxLength = 0;
    } else {
      element.type === "Array" ? undefined : (jsonElement.maxOccurs = -1);
      jsonElement.elementType =
        element.type === "Array"
          ? mendixmodelsdk_1.mappings.ElementType.Array
          : mendixmodelsdk_1.mappings.ElementType.Object;
    }
    JSONElements.push(jsonElement);
  });
  var arry = JSONElements.reverse();
  for (let i = 0; i < arry.length; i++) {
    for (let j = 0; j < arry.length; j++) {
      var str = arry[i].path;
      var lastIndex = str.lastIndexOf("|");
      str = str.substring(0, lastIndex);
      if (str === arry[j].path) {
        arry[j].children.push(arry[i]);
      }
    }
  }
  var jsonElementRoot =
    mendixmodelsdk_1.jsonstructures.JsonElement.create(model);
  jsonElementRoot.elementType = mendixmodelsdk_1.mappings.ElementType.Object;
  jsonElementRoot.path = "(Object)";
  jsonElementRoot.nillable = true;
  jsonElementRoot.exposedName = "Root";
  jsonElementRoot.children.push(arry[arry.length - 1]);
  var jSON_structure =
    mendixmodelsdk_1.jsonstructures.JsonStructure.createIn(model);
  jSON_structure.name = "JSON_structure";
  jSON_structure.jsonSnippet = JSON.stringify(json);
  jSON_structure.elements.push(jsonElementRoot);
  return jSON_structure;
}

export { CreateJson_Structure };
