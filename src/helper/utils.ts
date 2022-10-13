export const ObjectValueUndefinedRemove = (object) => {
  const newObj = {};
  Object.keys(object).forEach((key) => {
    if (object[key] === Object(object[key])) newObj[key] = ObjectValueUndefinedRemove(object[key]);
    else if (object[key] !== undefined) newObj[key] = object[key];
  });
  return newObj;
};
