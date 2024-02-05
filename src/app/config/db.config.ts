export const LOCAL_DB_CONF = {
  version: 1,
  name: "blazebooks-local-db",
  tables: {
    bookmarks: "userId,bookId",
    lastReaded: "userId",
  },
};

export const DEFAULT_USER_ID: string = "anon";
