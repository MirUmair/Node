import mendixmodelsdk_1 from "mendixmodelsdk";
import { DataView } from "./CreateDataView.js";

const Layout = (
  modules,
  text,
  pageVariable1,
  attributes,
  EntityName,
  moduleName
) => {
  const model = modules.allModules().filter((dm) => dm.name === moduleName)[0];
  var appearance = mendixmodelsdk_1.pages.Appearance.create(model);
  var appearance1 = mendixmodelsdk_1.pages.Appearance.create(model);
  var layoutGridColumn = mendixmodelsdk_1.pages.LayoutGridColumn.create(model);
  layoutGridColumn.weight = -1;
  layoutGridColumn.widgets.push(
    DataView(
      modules,
      "DataView1",
      pageVariable1,
      attributes,
      EntityName,
      moduleName
    )
  );
  layoutGridColumn.appearance = appearance1;
  var appearance2 = mendixmodelsdk_1.pages.Appearance.create(model);
  var layoutGridRow = mendixmodelsdk_1.pages.LayoutGridRow.create(model);
  layoutGridRow.columns.push(layoutGridColumn);
  layoutGridRow.appearance = appearance2;
  var layoutGrid = mendixmodelsdk_1.pages.LayoutGrid.create(model);
  layoutGrid.name = text;
  layoutGrid.appearance = appearance;
  layoutGrid.rows.push(layoutGridRow);
  var layoutCallArgument =
    mendixmodelsdk_1.pages.LayoutCallArgument.create(model);
  layoutCallArgument.__parameter.updateWithRawValue(
    "Atlas_Core.PopupLayout.Main"
  );
  layoutCallArgument.widgets.push(layoutGrid);
  var layoutCall = mendixmodelsdk_1.pages.LayoutCall.create(model);
  layoutCall.layout = modules.findLayoutByQualifiedName(
    "Atlas_Core.PopupLayout"
  );
  layoutCall.arguments.push(layoutCallArgument);
  return layoutCall;
};

export { Layout };
