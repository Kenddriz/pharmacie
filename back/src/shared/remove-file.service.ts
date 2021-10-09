import { join } from 'path';
import { access, constants, unlinkSync } from 'fs';

export const removeFile = (filename: string): boolean => {
  const path = join(__dirname, '../../public/', filename);
  let removed = false;
  access(path, constants.F_OK, (err) => {
    if (!err) {
      try {
        unlinkSync(path);
        removed = true;
      } catch {}
    }
  });
  return removed;
};
