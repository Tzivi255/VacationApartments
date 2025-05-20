import { BrowserRouter } from "react-router-dom"
import { Nav } from "../Routing/Nav"
import { Routing } from "../Routing/Routing"
import { Provider } from "react-redux"
import store from "../Redux/Store"

export const Main = () => {
    return <>
        <Provider store={store}>
            <BrowserRouter>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>
    </>
}