import mendixplatformsdk_1 from "mendixplatformsdk";
import mendixmodelsdk_1 from "mendixmodelsdk";

const ApplicationName = (id) => {
  const client = new mendixplatformsdk_1.MendixPlatformClient();
  const Appname = client.getApp(id);
  return Appname;
};

const SearchField = (text, modules, EntityName, module) => {
  const model = modules.allModules().filter((dm) => dm.name === module)[0];
  var translation = mendixmodelsdk_1.texts.Translation.create(model);
  translation.languageCode = "en_US";
  translation.text = text;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  text1.translations.push(translation);
  var text2 = mendixmodelsdk_1.texts.Text.create(model);
  var attributeRef = mendixmodelsdk_1.domainmodels.AttributeRef.create(model);
  attributeRef.attribute = modules.findAttributeByQualifiedName(
    module + "." + EntityName + "." + text
  );
  var searchField = mendixmodelsdk_1.pages.ComparisonSearchField.create(model);
  searchField.name = "searchField_" + text;
  searchField.caption = text1;
  searchField.placeholder = text2;
  searchField.attributeRef = attributeRef;
  return searchField;
};

const gridNewButton = (text, modules, EntityName, module) => {
  const model = modules.allModules().filter((dm) => dm.name === module)[0];
  var translation = mendixmodelsdk_1.texts.Translation.create(model);
  translation.languageCode = "en_US";
  translation.text = text;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  text1.translations.push(translation);
  var text2 = mendixmodelsdk_1.texts.Text.create(model);
  var clientTemplate = mendixmodelsdk_1.pages.ClientTemplate.create(model);
  clientTemplate.template = text1;
  clientTemplate.fallback = text2;
  var text3 = mendixmodelsdk_1.texts.Text.create(model);
  var appearance = mendixmodelsdk_1.pages.Appearance.create(model);
  var pageSettings = mendixmodelsdk_1.pages.PageSettings.create(model);
  pageSettings.page = modules.findPageByQualifiedName(
    module + "." + EntityName + "_NewEdit"
  );
  var newButton = mendixmodelsdk_1.pages.GridNewButton.create(model);
  newButton.name = text;
  newButton.caption = clientTemplate;
  newButton.tooltip = text3;
  newButton.appearance = appearance;
  newButton.entity = modules.findEntityByQualifiedName(
    module + "." + EntityName
  );
  newButton.pageSettings = pageSettings;
  return newButton;
};

const Column = (text, modules, entity, module) => {
  const model = modules.allModules().filter((dm) => dm.name === module)[0];
  var translation = mendixmodelsdk_1.texts.Translation.create(model);
  translation.languageCode = "en_US";
  translation.text = text;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  text1.translations.push(translation);
  var attributeRef = mendixmodelsdk_1.domainmodels.AttributeRef.create(model);
  attributeRef.attribute = modules.findAttributeByQualifiedName(
    module + "." + entity.name + "." + text
  );
  var formattingInfo = mendixmodelsdk_1.pages.FormattingInfo.create(model);
  var text2 = mendixmodelsdk_1.texts.Text.create(model);
  var appearance = mendixmodelsdk_1.pages.Appearance.create(model);
  var column = mendixmodelsdk_1.pages.GridColumn.create(model);
  column.name = text;
  column.caption = text1;
  column.attributeRef = attributeRef;
  column.formattingInfo = formattingInfo;
  column.aggregateCaption = text2;
  column.width = 100 / entity.attributes.length;
  column.appearance = appearance;
  return column;
};

const Button = (modules, text, module) => {
  const model = modules.allModules().filter((dm) => dm.name === module)[0];
  var cancelChangesClientAction1 =
    mendixmodelsdk_1.pages.CancelChangesClientAction.create(model);
  var saveChangesClientAction1 =
    mendixmodelsdk_1.pages.SaveChangesClientAction.create(model);
  var deleteClientAction1 =
    mendixmodelsdk_1.pages.DeleteClientAction.create(model);
  deleteClientAction1.closePage = false;
  var appearance5 = mendixmodelsdk_1.pages.Appearance.create(model);
  var translation3 = mendixmodelsdk_1.texts.Translation.create(model);
  translation3.languageCode = "en_US";
  translation3.text = text;
  var text9 = mendixmodelsdk_1.texts.Text.create(model);
  text9.translations.push(translation3);
  var text10 = mendixmodelsdk_1.texts.Text.create(model);
  var clientTemplate3 = mendixmodelsdk_1.pages.ClientTemplate.create(model);
  clientTemplate3.template = text9;
  clientTemplate3.fallback = text10;
  var text11 = mendixmodelsdk_1.texts.Text.create(model);
  var saveChangesClientAction1 =
    mendixmodelsdk_1.pages.SaveChangesClientAction.create(model);
  var pageSettings2 = mendixmodelsdk_1.pages.PageSettings.create(model);
  var pageClientAction = mendixmodelsdk_1.pages.PageClientAction.create(model);
  pageClientAction.pageSettings = pageSettings2;
  var actionButton =
    text === "Delete" || text === "Edit"
      ? mendixmodelsdk_1.pages.GridActionButton.create(model)
      : text === "Search"
        ? mendixmodelsdk_1.pages.GridSearchButton.create(model)
        : mendixmodelsdk_1.pages.ActionButton.create(model);
  actionButton.name = text;
  actionButton.appearance = appearance5;
  actionButton.caption = clientTemplate3;
  actionButton.tooltip = text11;
  actionButton.buttonStyle =
    text == "Cancel"
      ? mendixmodelsdk_1.pages.ButtonStyle.Default
      : mendixmodelsdk_1.pages.ButtonStyle.Success;
  actionButton.action =
    text === "Search"
      ? ""
      : text === "Delete"
        ? deleteClientAction1
        : text === "Edit"
          ? pageClientAction1
          : text == "Cancel"
            ? cancelChangesClientAction1
            : saveChangesClientAction1;
  return actionButton;
};

const TextBox = (modules, text, EntityName, module) => {
  const model = modules.allModules().filter((dm) => dm.name === module)[0];
  var appearance = mendixmodelsdk_1.pages.Appearance.create(model);
  var translation = mendixmodelsdk_1.texts.Translation.create(model);
  translation.languageCode = "en_US";
  translation.text = text;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  text1.translations.push(translation);
  var text2 = mendixmodelsdk_1.texts.Text.create(model);
  var clientTemplate = mendixmodelsdk_1.pages.ClientTemplate.create(model);
  clientTemplate.template = text1;
  clientTemplate.fallback = text2;
  var attributeRef = mendixmodelsdk_1.domainmodels.AttributeRef.create(model);
  attributeRef.attribute = modules.findAttributeByQualifiedName(
    module + "." + EntityName + "." + text
  );
  var text3 = mendixmodelsdk_1.texts.Text.create(model);
  var widgetValidation = mendixmodelsdk_1.pages.WidgetValidation.create(model);
  widgetValidation.message = text3;
  var noClientAction1 = mendixmodelsdk_1.pages.NoClientAction.create(model);
  var noClientAction2 = mendixmodelsdk_1.pages.NoClientAction.create(model);
  var noClientAction3 = mendixmodelsdk_1.pages.NoClientAction.create(model);
  var text4 = mendixmodelsdk_1.texts.Text.create(model);
  var formattingInfo = mendixmodelsdk_1.pages.FormattingInfo.create(model);
  var noClientAction = mendixmodelsdk_1.pages.NoClientAction.create(model);
  var textBox = mendixmodelsdk_1.pages.TextBox.create(model);
  textBox.name = text;
  textBox.appearance = appearance;
  textBox.labelTemplate = clientTemplate;
  textBox.attributeRef = attributeRef;
  textBox.validation = widgetValidation;
  textBox.onChangeAction = noClientAction1;
  textBox.onEnterAction = noClientAction2;
  textBox.onLeaveAction = noClientAction3;
  textBox.placeholder = text4;
  textBox.formattingInfo = formattingInfo;
  textBox.onEnterKeyPressAction = noClientAction;
  return textBox;
};

const MenuItem = async (modules, text) => {
  const model = modules.allModules().filter((dm) => dm.name === "SDKModule")[0];
  var pageSettings = mendixmodelsdk_1.pages.PageSettings.create(model);
  pageSettings.page = modules.findPageByQualifiedName("SDKModule." + text);
  var pageClientAction = mendixmodelsdk_1.pages.PageClientAction.create(model);
  pageClientAction.pageSettings = pageSettings;
  var translation = mendixmodelsdk_1.texts.Translation.create(model);
  translation.languageCode = "en_US";
  translation.text = text;
  var glyphIcon = mendixmodelsdk_1.pages.GlyphIcon.create(model);
  glyphIcon.code = 57377;
  var text1 = mendixmodelsdk_1.texts.Text.create(model);
  text1.translations.push(translation);
  var menuItem = mendixmodelsdk_1.menus.MenuItem.create(model);
  menuItem.caption = text1;
  menuItem.icon = glyphIcon;
  menuItem.action = pageClientAction;
  const navigationDoc = modules.allNavigationDocuments()[0].profiles[0];
  const navigationDocLoad = await navigationDoc.load();
  navigationDocLoad.menuItemCollection.items.push(menuItem);
};

export {
  ApplicationName,
  SearchField,
  gridNewButton,
  Column,
  Button,
  TextBox,
  MenuItem,
};
