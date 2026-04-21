import NProgress from "nprogress";

/**
 * Manually starts the top progress bar.
 * Use this for async actions like saving forms or generating PDFs.
 */
export const startLoading = () => {
  NProgress.start();
};

/**
 * Completes the top progress bar.
 */
export const stopLoading = () => {
  NProgress.done();
};
