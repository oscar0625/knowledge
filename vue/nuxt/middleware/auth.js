export default function ({ app, route, redirect }) {
  const token = app.$cookies.get("token");
  if (!token) {
    return redirect("/login", { path: route.path });
  }
}
