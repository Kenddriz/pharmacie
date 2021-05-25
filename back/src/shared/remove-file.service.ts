import { join } from 'path';
import * as fs from 'fs';

export const removeFile = (filename: string): boolean => {
  const path = join(__dirname, '../../../public/', filename);
  let removed = false;
  fs.access(path, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlinkSync(path);
      removed = true;
    }
  });
  return removed;
};
