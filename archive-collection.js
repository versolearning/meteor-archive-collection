/* global ArchiveCollection:true */

function buildSelector(selector, args) {
  if (_.isString(selector)) {
    selector = { _id: selector };
  } else if (selector instanceof Mongo.ObjectID) {
    selector = { _id: selector.valueOf() };
  // If selector is omitted, we return everything (default MongoDB behavior).
  // If selector is passed in as false or undefined, nothing should be returned.
  } else if (args.length === 0) {
    selector = {};
  }

  return selector;
}

// Override the provided selector to filter out all archived documents by default.
// If the provided selector contains the `archived` key (e.g. {archived: true}),
// the filter will be disregarded.
function applyArchivedFilter(selector, args) {
  selector = buildSelector(selector, args);

  // Only apply filter if the `archived` key is not defined in selector
  if (selector && _.isUndefined(selector.archived))
    selector.archived = { $ne: true };

  return selector;
}

ArchiveCollection = class extends Mongo.Collection {
  find(selector, options) {
    selector = applyArchivedFilter(selector, arguments);
    return super.find(selector, options);
  }

  findOne(selector, options) {
    selector = applyArchivedFilter(selector, arguments);
    return super.findOne(selector, options);
  }

  findIncludeArchived(selector, options) {
    if (arguments.length === 0) selector = {};
    return super.find(selector, options);
  }

  findOneIncludeArchived(selector, options) {
    if (arguments.length === 0) selector = {};
    return super.findOne(selector, options);
  }
};
