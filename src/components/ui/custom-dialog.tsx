"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CustomDialog = DialogPrimitive.Root;
const CustomDialogTrigger = DialogPrimitive.Trigger;

const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { showIcon?: boolean }
>(({ className, children, showIcon = true, ...props }, ref) => (
  <DialogPrimitive.Portal forceMount>
    <AnimatePresence>
      <DialogPrimitive.Overlay asChild>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" 
        />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content
        ref={ref}
        asChild
        {...props}
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-900/10 rounded-[3rem] duration-200 focus-visible:outline-none",
            className
          )}
        >
          {showIcon && (
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 mb-2">
              <AlertCircle className="h-10 w-10" />
            </div>
          )}
          {children}
          <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 text-slate-400 opacity-70 ring-offset-white transition-all hover:opacity-100 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </motion.div>
      </DialogPrimitive.Content>
    </AnimatePresence>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

const CustomDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center",
      className
    )}
    {...props}
  />
);
CustomDialogHeader.displayName = "CustomDialogHeader";

const CustomDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-4 gap-4",
      className
    )}
    {...props}
  />
);
CustomDialogFooter.displayName = "CustomDialogFooter";

const CustomDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-black leading-none tracking-tight text-slate-900",
      className
    )}
    {...props}
  />
));
CustomDialogTitle.displayName = DialogPrimitive.Title.displayName;

const CustomDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-slate-500 font-medium leading-relaxed", className)}
    {...props}
  />
));
CustomDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  CustomDialog,
  CustomDialogTrigger,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogFooter,
  CustomDialogTitle,
  CustomDialogDescription,
};
