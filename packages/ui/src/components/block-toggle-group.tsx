import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupProps,
} from '@repo/ui/components/toggle-group';
import { ImageIcon, MousePointerClickIcon, TextIcon } from 'lucide-react';

interface Props<T extends ToggleGroupProps['type']> {
  type: T;
  value: T extends 'multiple' ? string[] : string;
  onValueChange: T extends 'multiple'
    ? (value: string[]) => void
    : (value: string) => void;
}

export const BlockToggleGroup = <T extends ToggleGroupProps['type']>(
  props: Props<T>,
) => {
  return (
    <div>
      <ToggleGroup variant="primary" type="multiple" onValueChange={undefined}>
        <ToggleGroupItem value="image" aria-label="Toggle background image">
          <ImageIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="actions" aria-label="Toggle call-to-actions">
          <MousePointerClickIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="text" aria-label="Toggle portable text">
          <TextIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
