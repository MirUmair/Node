import { NewEditPage } from "./NewEditPage.js";
import { checkElementTypeWithPaths } from "./CheckElementTypeWithPaths.js";
import { OverViewPages } from "./OverViewPages.js";

import mendixmodelsdk_1 from "mendixmodelsdk";

const CreateEntities = (json, modules, moduleName, model) => {
  var path = [];
  var Entities = [];
  var obj = {};
  const elementTypesWithPaths = checkElementTypeWithPaths(json);  
  for (let i = 0; i < Object.keys(elementTypesWithPaths).length; i++) {
      
    console.log("Keys"+Object.keys(elementTypesWithPaths))
      path.push({
        path: `${"(Object)|" + Object.keys(elementTypesWithPaths)[i]?.replaceAll(".", "|")?.replaceAll("0", "(Object)")}`,
        value: Object.values(elementTypesWithPaths)[i].value,
        name: Object.values(elementTypesWithPaths)[i].key,
        type: Object.values(elementTypesWithPaths)[i].type,
        level: Object.values(elementTypesWithPaths)[i].i,
      });
    }
  path.forEach((item) => {
    if (item.type !== "string") {
      let num = 2;
      let name =
        item.name === "0"
          ? obj.name + "Item"
          : Entities.filter((i) => {
              let step = i.name.split("_");
              if (step[step.length - 1].length === 1) {
                num = JSON.parse(step[step.length - 1]) + 1;
              }
              return i.name === item.name;
            }).length
          ? item.name + "_" + num
          : item.name;
      let association = obj.name ? name + "_" + obj.name : null;
      let parent = obj.name ? obj.name : null;
      obj = {};
      obj.name = name;
      obj.association = association;
      obj.parent = parent;
      obj.child = name;
      if (item.type === "Object") {
        var atr = [];
        const values = Object.values(item.value);
        const keys = Object.keys(item.value);
        for (let a = 0; a < values.length; a++) {
          if (!Array.isArray(values[a]) && typeof values[a] !== "object") {
            atr.push(keys[a]);
          }
        }
        obj.atr = atr;
      }
      Entities.push(obj);
    }
  });
  let count = 0;
  let e1 = 1;
  let e2 = 1;
  const per_entities = [];
  const non_per_entities = [];
  const per_associations = [];
  const non_per_associations = [];
  const non_per_entity_root =
    mendixmodelsdk_1.domainmodels.Entity.createIn(model);
  non_per_entity_root.name = "Root";
  non_per_entity_root.location = { x: e2, y: e1 };
  const entityNoGeneralization =
    mendixmodelsdk_1.domainmodels.NoGeneralization.createIn(
      non_per_entity_root
    );
  entityNoGeneralization.persistable = false;
  const per_entity_root = mendixmodelsdk_1.domainmodels.Entity.createIn(model);
  per_entity_root.name = "Root_2";
  per_entity_root.location = { x: 200, y: 0 };
  per_entities.push(per_entity_root);
  non_per_entities.push(non_per_entity_root);
  non_per_associations.push(non_per_entity_root);
  per_associations.push(per_entity_root);
  Entities.forEach((i) => {
    e1 = e1 + 140;
    e2 = e2 + 50;
    const non_per_entity = mendixmodelsdk_1.domainmodels.Entity.createIn(model);
    non_per_entity.name = i.name;
    non_per_entity.location = { x: e2, y: e1 };
    const entityNoGeneralization =
      mendixmodelsdk_1.domainmodels.NoGeneralization.createIn(non_per_entity);
    entityNoGeneralization.persistable = false;
    if (i.atr && i.atr.length) {
      i.atr.forEach((i) => {
        const atr =
          mendixmodelsdk_1.domainmodels.Attribute.createIn(non_per_entity);
        atr.name = i;
      });
    }
    const per_entity = mendixmodelsdk_1.domainmodels.Entity.createIn(model);
    per_entity.name = i.name + "_2";
    per_entity.location = { x: e2 + 200, y: e1 };
    if (i.atr && i.atr.length) {
      i.atr.forEach((i) => {
        const atr =
          mendixmodelsdk_1.domainmodels.Attribute.createIn(per_entity);
        atr.name = i;
      });
    }
    if (i.association) {
      non_per_associations.push(non_per_entity);
      per_associations.push(per_entity);
    }
    non_per_entities.push(non_per_entity);
    per_entities.push(per_entity);
  });
  e1 = 0;
  e2 = 1;
  count = 0;
  per_associations.forEach(() => {
    const per_association =
      mendixmodelsdk_1.domainmodels.Association.createIn(model);
    per_association.name =
      per_entities[e2]?.name + "_" + per_entities[e1]?.name;
    per_association.child = per_entities[e1];
    per_association.parent = per_entities[e2];
    per_association.type =
      mendixmodelsdk_1.domainmodels.AssociationType.Reference;
    per_association.owner = per_entities[e2].name.includes("Item")
      ? mendixmodelsdk_1.domainmodels.AssociationOwner.Default
      : mendixmodelsdk_1.domainmodels.AssociationOwner.Both;
    per_association.childConnection = { x: 50, y: 100 };
    per_association.parentConnection = { x: 50, y: 0 };
    /////
    const non_per_association =
      mendixmodelsdk_1.domainmodels.Association.createIn(model);
    non_per_association.name =
      non_per_entities[e2].name + "_" + non_per_entities[e1]?.name;
    non_per_association.child = non_per_entities[e1];
    non_per_association.parent = non_per_entities[e2];
    non_per_association.type =
      mendixmodelsdk_1.domainmodels.AssociationType.Reference;
    non_per_association.owner = non_per_entities[e2]?.name.includes("Item")
      ? mendixmodelsdk_1.domainmodels.AssociationOwner.Default
      : mendixmodelsdk_1.domainmodels.AssociationOwner.Both;
    non_per_association.childConnection = { x: 50, y: 100 };
    non_per_association.parentConnection = { x: 50, y: 0 };

    count = +1;
    e1 = e1 + count;
    e2 = e2 + count;
  });
  per_entities.forEach((element) => {
    NewEditPage(modules, element, moduleName);
    OverViewPages(modules, element, moduleName);
  });
};

export { CreateEntities };
