import type { reduxRoot } from "../redux/reduxRoot";

export type reduxStoreType = ReturnType<typeof reduxRoot.getState>;

export type appDispatch = typeof reduxRoot.dispatch;
