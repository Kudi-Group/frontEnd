import { Cards } from "./cards";
import { Header } from "./header";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

export function Dashboard() {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="h-100%  rounded-lg border w-100%"
        >
            <ResizablePanel defaultSize={15}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Sidebar</span>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
                <div className="p-6">
                        <Header />
                        <Cards />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
