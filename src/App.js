import { Provider } from "react-redux";
import { thunk } from "redux-thunk"; // Corrected import statement
import { applyMiddleware, createStore } from "redux";
import reducers from "./redux/reducer";
import "./App.css";
import Home from "./components/Home";

function App() {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
