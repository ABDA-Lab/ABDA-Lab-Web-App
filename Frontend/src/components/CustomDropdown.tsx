import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownProps {
    label?: string;
    options: Array<{
        label: string;
        shortcut?: string;
        onClick?: () => void;
        disabled?: boolean;
    }>;
}

export default function CustomDropdown({ label = 'Options', options }: DropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {options.map((option, index) => (
                    <DropdownMenuGroup key={index}>
                        <DropdownMenuItem
                            onClick={option.onClick}
                            disabled={option.disabled}
                            className={`${option.disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
                            {option.label}
                            {option.shortcut && <span className="ml-auto text-gray-400">{option.shortcut}</span>}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                ))}
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Usage Example:
// <CustomDropdown
//   label="My Menu"
//   options={[
//     { label: "Profile", shortcut: "⌘P", onClick: () => console.log("Profile clicked") },
//     { label: "Settings", shortcut: "⌘S", onClick: () => console.log("Settings clicked") },
//     { label: "Log Out", shortcut: "⇧⌘Q", onClick: () => console.log("Logged out"), disabled: false },
//   ]}
// />
