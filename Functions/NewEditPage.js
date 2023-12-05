import mendixmodelsdk_1 from "mendixmodelsdk";
import { Layout } from "./CreateLayout.js";

function NewEditPage(modules, entity, moduleName) {
  const model = modules.allModules().filter((dm) => dm.name === moduleName)[0];
  var pageVariable = mendixmodelsdk_1.pages.PageVariable.create(model);
  var translation = mendixmodelsdk_1.texts.Translation.create(model);
  translation.languageCode = "en_US";
  translation.text = "Edit " + entity.name;
  var text16 = mendixmodelsdk_1.texts.Text.create(model);
  text16.translations.push(translation);
  var appearance = mendixmodelsdk_1.pages.Appearance.create(model);
  var objectType = mendixmodelsdk_1.datatypes.ObjectType.create(model);
  objectType.entity = entity;
  var user = mendixmodelsdk_1.pages.PageParameter.create(model);
  user.name = entity.name;
  user.parameterType = objectType;
  var name = entity.name + "_NewEdit";
  var user_NewEdit = mendixmodelsdk_1.pages.Page.createIn(model);
  user_NewEdit.name = name;
  user_NewEdit.parameters.push(user);
  user_NewEdit.layoutCall = Layout(
    modules,
    "layoutGrid1",
    pageVariable,
    entity.attributes,
    entity.name,
    moduleName
  );
  user_NewEdit.title = text16;
  user_NewEdit.appearance = appearance;
  pageVariable.pageParameter = user;
}

export { NewEditPage };
