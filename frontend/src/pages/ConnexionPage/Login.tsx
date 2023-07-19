export default function Login() {
  function handleSubmit(e: Event) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // // Read the form data
    // const form = e.target;
    // const formData = new FormData(form);

    // // You can pass formData as a fetch body directly:
    // fetch("/some-api", { method: form.method, body: formData });

    // // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    console.log("submitted");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Adresse email *
        <input type="email" name="email" />
      </label>
      <label htmlFor="password">
        Mot de passe *
        <input type="password" name="password" />
      </label>
      <input type="submit" value="Me connecter" />
    </form>
  );
}
