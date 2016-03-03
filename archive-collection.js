/* global ArchiveCollection:true */

ArchiveCollection = class extends Mongo.Collection {

  // Override the provided selector to filter out all archived documents by default.
  // If the provided selector contains the `archived` key (e.g. {archived: true}), the filter will
  // be disregarded.
  static _applyArchivedFilter(selector) {
    if (_.isString(selector))
      selector = {_id: selector};
    else if (selector instanceof Mongo.ObjectID)
      selector = {_id: selector.valueOf()};

    selector = selector || {};

    // Only apply filter if the `archived` key is not defined in selector
    if (_.isUndefined(selector.archived))
      selector.archived = {$ne: true};

    return selector;
  }

  find(selector, options) {
    selector = ArchiveCollection._applyArchivedFilter(selector);
    return super.find(selector, options);
  }

  findOne(selector, options) {
    selector = ArchiveCollection._applyArchivedFilter(selector);
    return super.findOne(selector, options);
  }

  findIncludeArchived(selector, options) {
    return super.find(selector || {}, options);
  }

  findOneIncludeArchived(selector, options) {
    return super.findOne(selector || {}, options);
  }

}
