import { useState } from 'react'

// Keep the existing frame and source. A failed decode must not show a broken
// image icon or imply that an unrelated replacement represents the project.
export default function ResilientImage({ src, alt, style, ...props }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const failed = failedSrc === src

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      aria-hidden={failed || undefined}
      style={{ ...style, ...(failed ? { visibility: 'hidden' } : {}) }}
      onError={() => setFailedSrc(src)}
      onLoad={() => setFailedSrc(null)}
    />
  )
}
