import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from '../i18n';
import VueApexCharts from 'vue3-apexcharts';

const i18n = createI18n({
  locale: 'en-US',
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
  app.use(VueApexCharts);
});

export { i18n };
