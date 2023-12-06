import "./footer.scss";
import { Linkedin, Facebook } from "react-feather";

export default function Footer() {
  return (
    <footer>
      <p>© 2023 makesense</p>
      <div>
        <a href="https://www.facebook.com/jobsthatmakesense" target="_blank">
          <Facebook />
        </a>
        <a href="https://www.linkedin.com/company/makesense/" target="_blank">
          <Linkedin />
        </a>
      </div>
    </footer>
  );
}
