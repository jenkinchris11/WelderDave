const imageModules = import.meta.glob('../assets/*.jpg', {
  eager: true,
  import: 'default',
});

const defaultGalleryImages = Object.keys(imageModules)
  .sort()
  .map((path, index) => ({
    id: `gallery-${index + 1}`,
    src: imageModules[path],
    alt: `WelderDave fabrication photo ${index + 1}`,
  }));

export { defaultGalleryImages };
