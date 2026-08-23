import React, { useState } from 'react';
import varanasiFallback from '../assets/varanasi-ganges.png';

/**
 * SafeImage
 * Renders an <img> with automatic fallback to a local asset if the primary
 * source fails to load. Prevents broken-image icons from remaining visible.
 */
export const SafeImage = ({
  src,
  alt = '',
  className = '',
  fallbackSrc,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state whenever the source changes by remounting the img element
  const currentSrc = hasError ? (fallbackSrc || varanasiFallback) : (src || varanasiFallback);

  return (
    <img
      key={src}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
