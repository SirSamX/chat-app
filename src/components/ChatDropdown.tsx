import {DropdownMenu, DropdownMenuContent, DropdownMenuSeparator,DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel} from "@/components/ui/dropdown-menu"
import { useChatContext } from "./providers/ChatContext";


export default function ChatDropdown() {
  const currentChat = useChatContext();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {currentChat?.selectedChat?.name}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Add User</DropdownMenuLabel>
          <DropdownMenuSeparator />

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
