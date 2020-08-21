export default function ({ app, redirect }) {
  const { mobile, ios, android, iPhone, iPad } = app.$browser.versions;
  if (mobile || ios || android || iPhone || iPad) {
    return redirect("/mobile");
  }
}
