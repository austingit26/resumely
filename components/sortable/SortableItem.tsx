'use client';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

type SortableItemProps = {
  id: string;
  children: React.ReactNode;
};

export default function SortableItem({
  id,
  children,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className={`p-3 border rounded-md bg-white cursor-grab active:cursor-grabbing touch-none ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {children}
    </div>
  );
}