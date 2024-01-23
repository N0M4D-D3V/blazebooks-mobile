export const LOCAL_DB_CONF = {
  version: 1,
  name: "blazebooks-local-db",
  tables: {
    users: "++id,email,passwd",
    user_configs: "++id,userId",
  },
};
