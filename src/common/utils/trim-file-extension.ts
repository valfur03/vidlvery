export const trimFileExtension = (filename: string) => {
  return filename.replace(/\.[^/.]+$/, '');
};
