
function logDbError(CollectionModel, operation, error, queryOptions) {
	const collectionName = CollectionModel?.collection?.name;
	const errorMessage = `[${operation}:${collectionName}] Exception: ${error?.message}`;
	console.dbError(errorMessage, { error, collection: collectionName, operation, queryOptions });
}

export default logDbError;
