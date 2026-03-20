import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-[#459492] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-[#5DB786]/30",
          error: "group-[.toaster]:border-destructive/30",
        },
      }}
      {...props} />
  );
}

export { Toaster, toast }
