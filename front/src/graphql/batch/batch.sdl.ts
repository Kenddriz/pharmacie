import { ARTICLE_PARAMS } from '../article/article.sdl';
import { FORM_PARAMS } from '../form/form.sdl';
import { PACKAGING_PARAMS } from '../packaging/packaging.sdl';

export const BATCH_FIELDS = `
  id
  expirationDate
  currentStock
  medicine {
    id
    article{${ARTICLE_PARAMS}}
    form {${FORM_PARAMS}}
    packaging {${PACKAGING_PARAMS}}
  }
`;
