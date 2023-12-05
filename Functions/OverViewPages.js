import mendixmodelsdk_1 from "mendixmodelsdk";

import {
  SearchField,
  gridNewButton,
  Column,
  Button,
  MenuItem,
} from "../Utilities/Index.js";

function OverViewPages(modules, entity, moduleName) {
  const model = modules.allModules().filter((dm) => dm.name === moduleName)[0];
  var appearance1 = mendixmodelsdk_1.pages.Appearance.create(model);
  var appearance2 = mendixmodelsdk_1.pages.Appearance.create(model);
  var translation1 = mendixmodelsdk_1.texts.Translation.create(model);
  translation1.languageCode = "en_US";
  translation1.text = entity.name;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  text1.translations.push(translation1);
  var text2 = mendixmodelsdk_1.texts.Text.create(model);
  var clientTemplate1 = mendixmodelsdk_1.pages.ClientTemplate.create(model);
  clientTemplate1.template = text1;
  clientTemplate1.fallback = text2;
  var text1_1 = mendixmodelsdk_1.pages.DynamicText.create(model);
  text1_1.name = "text1";
  text1_1.appearance = appearance2;
  text1_1.content = clientTemplate1;
  text1_1.renderMode = mendixmodelsdk_1.pages.TextRenderMode.H2;
  var directEntityRef1 =
    mendixmodelsdk_1.domainmodels.DirectEntityRef.create(model);
  directEntityRef1.entity = modules.findEntityByQualifiedName(
    moduleName + "." + entity.name
  );
  var gridSortBar1 = mendixmodelsdk_1.pages.GridSortBar.create(model);
  var searchBar1 = mendixmodelsdk_1.pages.SearchBar.create(model);
  entity.attributes.forEach((i) => {
    searchBar1.items.push(
      SearchField(i.name, modules, entity.name, moduleName)
    );
  });
  var gridDatabaseSource1 =
    mendixmodelsdk_1.pages.GridDatabaseSource.create(model);
  gridDatabaseSource1.entityRef = directEntityRef1;
  gridDatabaseSource1.sortBar = gridSortBar1;
  gridDatabaseSource1.searchBar = searchBar1;
  var translation2 = mendixmodelsdk_1.texts.Translation.create(model);
  translation2.languageCode = "en_US";
  translation2.text = "Edit";
  var text13 = mendixmodelsdk_1.texts.Text.create(model);
  text13.translations.push(translation2);
  var text14 = mendixmodelsdk_1.texts.Text.create(model);
  var clientTemplate4 = mendixmodelsdk_1.pages.ClientTemplate.create(model);
  clientTemplate4.template = text13;
  clientTemplate4.fallback = text14;
  var text15 = mendixmodelsdk_1.texts.Text.create(model);
  var appearance6 = mendixmodelsdk_1.pages.Appearance.create(model);
  var appearance3 = mendixmodelsdk_1.pages.Appearance.create(model);
  var pageVariable = mendixmodelsdk_1.pages.PageVariable.create(model);
  var pageParameterMapping =
    mendixmodelsdk_1.pages.PageParameterMapping.create(model);
  pageParameterMapping.parameter = modules.findPageParameterByQualifiedName(
    moduleName + "." + entity.name + "_NewEdit." + entity.name
  );
  pageParameterMapping.variable = pageVariable;
  var pageSettings = mendixmodelsdk_1.pages.PageSettings.create(model);
  pageSettings.page = modules.findPageByQualifiedName(
    moduleName + "." + entity.name + "_NewEdit"
  );
  pageSettings.parameterMappings.push(pageParameterMapping);
  var pageClientAction = mendixmodelsdk_1.pages.PageClientAction.create(model);
  pageClientAction.pageSettings = pageSettings;
  var actionButton = mendixmodelsdk_1.pages.GridActionButton.create(model);
  actionButton.name = "actionButton2";
  actionButton.caption = clientTemplate4;
  actionButton.tooltip = text15;
  actionButton.appearance = appearance6;
  actionButton.action = pageClientAction;
  var gridControlBar = mendixmodelsdk_1.pages.GridControlBar.create(model);
  gridControlBar.items.push(Button(modules, "Search", moduleName));
  gridControlBar.items.push(
    gridNewButton("New", modules, entity.name, moduleName)
  );
  gridControlBar.items.push(actionButton);
  gridControlBar.items.push(Button(modules, "Delete", moduleName));
  var text23 = mendixmodelsdk_1.texts.Text.create(model);
  var text24 = mendixmodelsdk_1.texts.Text.create(model);
  var clientTemplate6 = mendixmodelsdk_1.pages.ClientTemplate.create(model);
  clientTemplate6.template = text23;
  clientTemplate6.fallback = text24;
  var grid1_1 = mendixmodelsdk_1.pages.DataGrid.create(model);
  grid1_1.name = "grid1";
  grid1_1.appearance = appearance3;
  grid1_1.dataSource = gridDatabaseSource1;
  grid1_1.controlBar = gridControlBar;
  entity.attributes.forEach((i) => {
    grid1_1.columns.push(Column(i.name, modules, entity, moduleName));
  });
  grid1_1.caption = clientTemplate6;
  var appearance10 = mendixmodelsdk_1.pages.Appearance.create(model);
  var layoutGridColumn = mendixmodelsdk_1.pages.LayoutGridColumn.create(model);
  layoutGridColumn.weight = -1;
  layoutGridColumn.widgets.push(text1_1);
  layoutGridColumn.widgets.push(grid1_1);
  layoutGridColumn.appearance = appearance10;
  var appearance11 = mendixmodelsdk_1.pages.Appearance.create(model);
  var layoutGridRow1 = mendixmodelsdk_1.pages.LayoutGridRow.create(model);
  layoutGridRow1.columns.push(layoutGridColumn);
  layoutGridRow1.appearance = appearance11;
  var layoutGrid1_1 = mendixmodelsdk_1.pages.LayoutGrid.create(model);
  layoutGrid1_1.name = "layoutGrid1";
  layoutGrid1_1.appearance = appearance1;
  layoutGrid1_1.rows.push(layoutGridRow1);
  var layoutCallArgument1 =
    mendixmodelsdk_1.pages.LayoutCallArgument.create(model);
  layoutCallArgument1.__parameter.updateWithRawValue(
    "Atlas_Core.Atlas_Default.Main"
  );
  layoutCallArgument1.widgets.push(layoutGrid1_1);
  var layoutCall1 = mendixmodelsdk_1.pages.LayoutCall.create(model);
  layoutCall1.layout = modules.findLayoutByQualifiedName(
    "Atlas_Core.Atlas_Default"
  );
  layoutCall1.arguments.push(layoutCallArgument1);
  var translation10 = mendixmodelsdk_1.texts.Translation.create(model);
  translation10.languageCode = "en_US";
  translation10.text = entity.name + " Overview";
  var text25 = mendixmodelsdk_1.texts.Text.create(model);
  text25.translations.push(translation10);
  var appearance12 = mendixmodelsdk_1.pages.Appearance.create(model);
  var name = entity.name + "_Overview";
  var user_Overview = mendixmodelsdk_1.pages.Page.createIn(model);
  user_Overview.name = name;
  user_Overview.canvasWidth = 1198;
  user_Overview.layoutCall = layoutCall1;
  user_Overview.title = text25;
  user_Overview.appearance = appearance12;
  pageVariable.widget = grid1_1;
  gridControlBar.defaultButton = actionButton;
  MenuItem(modules, name);
}

export { OverViewPages };
