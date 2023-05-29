import { applyMiddleware } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // Redux 상태를 디버깅하는 데 사용되는 도구 모음
import reducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import logger from "redux-logger";
// Redux Saga는 Redux 액션을 리스닝하고, 그에 대응하는 사이드 이펙트를 실행하는 라이브러리.
const create = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
export default create;
