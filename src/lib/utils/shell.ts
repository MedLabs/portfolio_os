export function shell(cmd: string): string {
  if (cmd.trim() === "") {
    return "";
  }
  switch (cmd.trim()) {
    case "/help":
      return `Available commands:<br>
              whoami : returns infos about me<br>
              ls : lists files in home directory<br>
              cat : displays file's content<br>
              /files : runs Files Browser<br>
              /email : runs Contact form<br>
              /blog : runs blog app<br>
              /clear : clears terminal history`;
    case "whoami":
      return "Hi Medlabs here, a Fullstack Developer, Web Scraper, SysAdmin since 2004...";
    case "ls":
      return "projects.md &emsp; passwords.txt &emsp; fsociety.v &emsp; cat.png";
    case "cat":
      return "usage: cat 'filename'";
    case "cat passwords.txt":
      return "facebook: 12345678<br>twitter:wrongpassword<br>reddit: freePal3$Tine<br>paypal: billiondollaraccount6969";
    case "cat fsociety.txt":
      return "a malicious script in Nimlang !!!";
    default:
      return "Command not found.";
  }
}
