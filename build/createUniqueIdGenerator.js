const path = require('path');
const incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const scopes = {};

  return (name, scope) => {
    let generateNextId;
    let index;

    if (scopes[scope]) {
      if (scopes[scope].index[name]) return scopes[scope].index[name];

      generateNextId = scopes[scope].generator;
      index = scopes[scope].index;
    } else {
      generateNextId = incstr.idGenerator({
        alphabet: 'abcdefghijkmnopqrstuvwxyz',
      });

      index = {};

      scopes[scope] = {
        generator: generateNextId,
        index,
      };
    }

    let nextId;

    // Avoid generating a class name that contains the sequence 'ad'
    do nextId = generateNextId();
    while (/ad/.test(nextId));

    index[name] = nextId;

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const generateScopedName = (localName, resourcePath, useCaller, caller) => {
  const componentName = path.parse(resourcePath).name;
  const componentNameGenerated = componentName === 'shared' ? '' : uniqueIdGenerator(componentName);
  const generatedScopedName = `${componentNameGenerated}_${uniqueIdGenerator(localName, componentNameGenerated)}`;

  console.log(`${componentName}_${localName} => ${generatedScopedName}${(useCaller === true ? ` (${caller})` : '')}`);
  return generatedScopedName;
};

module.exports = generateScopedName;
