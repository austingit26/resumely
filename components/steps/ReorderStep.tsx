'use client';

import { Card } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { reorderSections } from '@/store/slices/resumeSlice';
import { ResumeSection } from '@/types/resume';

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

/* -----------------------------
   LABEL MAP
------------------------------*/
const SECTION_LABELS: Record<string, string> = {
  personal: 'Personal Information',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
};

/* -----------------------------
   SORTABLE ITEM
------------------------------*/
function SortableItem({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
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
      className="p-3 bg-secondary-200 border border-secondary-300 text-secondary-900 rounded-xl cursor-grab active:cursor-grabbing text-center"
    >
      {label}
    </div>
  );
}

/* -----------------------------
   MAIN COMPONENT
------------------------------*/
export default function ReorderStep() {
  const dispatch = useAppDispatch();

  const sectionOrder = useAppSelector(
    (state) => state.resume.sectionOrder
  );

  /* -----------------------------
     DRAG END
  ------------------------------*/
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(
      active.id as ResumeSection
    );

    const newIndex = sectionOrder.indexOf(
      over.id as ResumeSection
    );

    const newOrder = arrayMove(
      sectionOrder,
      oldIndex,
      newIndex
    );

    dispatch(reorderSections(newOrder));
  };

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-lg font-semibold">
          Reorder Sections
        </h2>
        <p className="text-sm text-gray-500">
          Drag to change resume layout order
        </p>
      </div>

      <div className="p-4 border border-zinc-300/50 rounded-xl">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {sectionOrder.map((section) => (
                <SortableItem
                  key={section}
                  id={section}
                  label={
                    SECTION_LABELS[section] ||
                    section
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}