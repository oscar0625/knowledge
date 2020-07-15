import { clearPending } from "@/plugins/axios";
export default function ({ app }) {
  app.router.beforeEach((to, from, next) => {
    clearPending();
    next();
  });
}
