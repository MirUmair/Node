const checkElementTypeWithPaths = (json, parentPath = "", i = 0) => {
  const result = {};
  i = i + 1;
  for (const key in json) {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;

    if (Array.isArray(json[key])) {
      result[currentPath] = { type: "Array", value: json[key], key, i };
      const nestedResults = checkElementTypeWithPaths(
        json[key],
        currentPath,
        i
      );

      Object.assign(result, nestedResults);
    } else if (typeof json[key] === "object") {
      result[currentPath] = { type: "Object", value: json[key], key, i };
      const nestedResults = checkElementTypeWithPaths(
        json[key],
        currentPath,
        i
      );
      Object.assign(result, nestedResults);
    } else {
      result[currentPath] = {
        type: typeof json[key],
        value: json[key],
        key,
        i,
      };
    }
  }

  return result;
};

export { checkElementTypeWithPaths };
