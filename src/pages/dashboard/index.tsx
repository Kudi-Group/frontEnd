import { Cards } from "./cards";
import { Header } from "./header";

export function Dashboard() {
    return (
        <div className="p-6 flex flex-col">
            <Header />
            <Cards />
        </div>
    )
}
