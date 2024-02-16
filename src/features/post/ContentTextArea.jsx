"use client";

import clsx from "clsx";
import { useRef, forwardRef } from "react";

export const ContentTextArea = forwardRef((props, ref) => {
  const { onChange, className, rows = 1, ...otherProps } = props;
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = e.currentTarget;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  return (
    <textarea
      ref={ref}
      onChange={(e) => {
        handleChange(e);
        if (onChange) onChange(e);
      }}
      rows={rows}
      className={clsx(
        className,
        "my-2 w-full resize-none rounded-xl border-2 border-stone-200 px-3 py-2 text-gray-800 outline-none",
      )}
      {...otherProps}
    />
  );
});

ContentTextArea.displayName = "ContentTextArea";
