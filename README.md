## Intro

This package exports a new class (`ArchiveCollection`) that can be used in place of
`Mongo.Collection`.

Collections created with this class will have `find` and `findOne` methods patched to automatically
filter out archived documents. This will help simplify your code if your application have to handle
archived documents.

Note: Archived documents are documents with an `archived` property set to `true`. For example, you
can mark a document as archived like this: `MyCollection.update('docId', {$set: {archive: true}})`. 
This particular doc will be automatically excluded from the result set of `find` and `findOne`.

## Usage

`Responses = new ArchiveCollection('responses');`

By default, all archived documents returned from `find` and `findOne` will be filtered out:

- `Responses.find(selector)`: Return all responses that match selector, except the ones with `archived` equals `true`.

- `Responses.findOne(selector)`: Return the specified response, but only if it isn't archived.

If the `archived` key is defined in selector, the filter will be disregarded:

- `Responses.find({archived: true})`: Return archived responses.

Another way to override the filter is using `findIncludeArchived` and `findOneIncludeArchived`:

- `Responses.findIncludeArchived(selector)`: Return all responses (archived and non-archived) that match selector.

