import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { LoanForm } from "./loan";

export function LoanEntryForm() {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="h-100%  rounded-lg border w-100%"
        >
            <ResizablePanel defaultSize={15} maxSize={20}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Sidebar</span>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
                <div className="p-6">
                        <LoanForm />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
