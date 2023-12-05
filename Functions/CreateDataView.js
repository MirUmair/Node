import mendixmodelsdk_1 from "mendixmodelsdk";
import { Button, TextBox } from "../Utilities/Index.js";

const DataView = (
  modules,
  text,
  pageVariable1,
  attributes,
  EntityName,
  moduleName
) => {
  const model = modules.allModules().filter((dm) => dm.name === moduleName)[0];
  var appearance = mendixmodelsdk_1.pages.Appearance.create(model);
  var directEntityRef =
    mendixmodelsdk_1.domainmodels.DirectEntityRef.create(model);
  directEntityRef.entity = modules.findEntityByQualifiedName(
    moduleName + "." + EntityName
  );
  var dataViewSource = mendixmodelsdk_1.pages.DataViewSource.create(model);
  dataViewSource.entityRef = directEntityRef;
  dataViewSource.sourceVariable = pageVariable1;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  var dataView = mendixmodelsdk_1.pages.DataView.create(model);
  dataView.name = text;
  dataView.appearance = appearance;
  dataView.dataSource = dataViewSource;
  attributes.forEach((i) => {
    dataView.widgets.push(TextBox(modules, i.name, EntityName, moduleName));
  });
  dataView.footerWidgets.push(Button(modules, "Save", moduleName));
  dataView.footerWidgets.push(Button(modules, "Cancel", moduleName));
  dataView.noEntityMessage = text1;
  return dataView;
};

export { DataView };
