"use client";

import React, { useRef, useState } from "react";
import { Upload, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image too large. Please select an image smaller than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new (window as any).Image();
        img.onload = () => {
          // Downscale to max 400px while maintaining aspect ratio
          const MAX_WIDTH = 400;
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Use JPEG with 0.8 quality for significant file size reduction
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
          onChange(compressedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => !value && fileInputRef.current?.click()}
      >
        <div className={`
          w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300
          ${value ? "border-indigo-600 ring-4 ring-indigo-50" : "border-slate-300 hover:border-indigo-400 bg-slate-50"}
        `}>
          {value ? (
            <div className="relative w-full h-full">
              <Image 
                src={value} 
                alt="Profile" 
                fill 
                className="object-cover"
              />
              {isHovering && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-500">
              <Upload className="h-6 w-6 mb-1" />
              <span className="text-[10px] font-medium">Upload Image</span>
            </div>
          )}
        </div>
        
        {!value && (
          <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1.5 shadow-lg border-2 border-white">
            <Upload className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {value && !isHovering && (
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Profile Photo</span>
      )}
    </div>
  );
};
