import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Trash2, GripVertical } from "lucide-react";

interface SortableImageProps {
  id: string;
  url: string;
  onRemove: (id: string) => void;
}

export function SortableImage({ id, url, onRemove }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1 bg-white/80 rounded cursor-grab active:cursor-grabbing hover:bg-white transition-colors z-20"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent drag start
          onRemove(id);
        }}
        type="button"
        className="absolute top-2 right-2 p-1 bg-white/80 rounded hover:bg-red-50 hover:text-red-500 transition-colors z-20"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="w-full h-full relative">
        <Image
          src={url}
          alt="Product Image"
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
