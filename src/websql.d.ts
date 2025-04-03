// types/websql.d.ts
interface Window {
  openDatabase: (
    name: string,
    version: string,
    displayName: string,
    estimatedSize: number,
    creationCallback?: DatabaseCallback
  ) => Database;

  // Optional: Add other WebSQL types if needed
  SQLTransaction: any;
  SQLResultSet: any;
  SQLResultSetRowList: any;
  SQLError: any;
}

interface Database {
  transaction: (
    callback: SQLTransactionCallback,
    errorCallback?: SQLTransactionErrorCallback,
    successCallback?: SQLVoidCallback
  ) => void;
  // Add other Database methods as needed
}