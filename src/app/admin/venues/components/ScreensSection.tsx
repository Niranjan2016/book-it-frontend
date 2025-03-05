import { Screen, SeatCategory } from "@/app/types/venues";
import { ScreenForm } from "./ScreenForm";

interface ScreensSectionProps {
  screens: Screen[];
  onScreenChange: (index: number, field: keyof Screen, value: string) => void;
  onSeatCategoryChange: (screenIndex: number, categoryIndex: number, field: keyof SeatCategory, value: string | number) => void;
  onAddScreen: () => void;
  onRemoveScreen: (index: number) => void;
}

export function ScreensSection({
  screens,
  onScreenChange,
  onSeatCategoryChange,
  onAddScreen,
  onRemoveScreen,
}: ScreensSectionProps) {
  return (
    <div className="space-y-4 flex-1">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Screens</h3>
        <button
          type="button"
          onClick={onAddScreen}
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Add Screen
        </button>
      </div>

      {screens.map((screen, index) => (
        <ScreenForm
          key={index}
          screen={screen}
          index={index}
          onScreenChange={(field, value) => onScreenChange(index, field, value)}
          onSeatCategoryChange={(categoryIndex, field, value) =>
            onSeatCategoryChange(index, categoryIndex, field, value)
          }
          onRemove={() => onRemoveScreen(index)}
          canRemove={screens.length > 1}
        />
      ))}
    </div>
  );
}