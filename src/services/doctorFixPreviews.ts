import type { Repository } from "../types";

/** File previews, NOT GitHub writes. All generated files require user review. */
export interface GeneratedPreview {
  filename: string;
  language: string;
  description: string;
  content: string;
}
const NL = "\n";

export class DoctorFixPreview {
  static generatePagesWorkflow(_name: string): GeneratedPreview {
    return {
      filename: ".github/workflows/pages-manual.yml",
      language: "yaml",
      description: "Ejemplo manual para sitios con dist/index.html existente. Revisar permisos, artefactos y dominio antes de adoptarlo.",
      content: [
        "# PREVIEW ONLY - doesn't run in this app",
        "# Confirm that dist/ contains only content you are licensed to publish.",
        "name: Manual Pages Candidate",
        "on:",
        "  workflow_dispatch:",
        "permissions:",
        "  contents: read",
        "  pages: write",
        "  id-token: write",
        "jobs:",
        "  pages:",
        "    runs-on: ubuntu-latest",
        "    environment:",
        "      name: github-pages",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - name: Require actual built artifact",
        "        run: test -s dist/index.html",
        "      - uses: actions/configure-pages@v5",
        "      - uses: actions/upload-pages-artifact@v3",
        "        with:",
        "          path: dist",
        "      - uses: actions/deploy-pages@v4",
      ].join(NL) + NL,
    };
  }

  static generatePhalanxWorkflow(): GeneratedPreview {
    return {
      filename: ".github/workflows/file-gate.yml",
      language: "yaml",
      description: "Chequeo básico de nombres peligrosos, no escáner de secretos ni certificación de seguridad.",
      content: [
        "name: Sensitive File Names",
        "on:",
        "  pull_request:",
        "permissions:",
        "  contents: read",
        "jobs:",
        "  scan:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - name: Fail if sensitive files are tracked",
        "        shell: bash",
        "        run: |",
        "          if git ls-files | grep -E '(^|/)(\\.env(\\..*)?|id_rsa|.*\\.pem)$' >/dev/null; then",
        '            echo "::error::Sensitive filename found in Git index."',
        "            exit 1",
        "          fi",
        '          echo "Filename check only. Does not inspect historical secrets."',
      ].join(NL) + NL,
    };
  }

  static generateSecurityPolicy(name: string): GeneratedPreview {
    return {
      filename: "SECURITY-DRAFT.md",
      language: "markdown",
      description: "Plantilla no activada, sin inventar direcciones de seguridad ni tiempos de respuesta.",
      content: [
        "# Security disclosure - " + name.replace(/[\r\n#]/g, " ").slice(0, 80),
        "",
        "Please use GitHub private vulnerability reporting if this repository supports it.",
        "Do not post secrets, tokens, personal data or exploit details in public issues.",
        "Maintainer: add a verified private contact method and response policy before publishing.",
      ].join(NL) + NL,
    };
  }

  static generateReadme(repo: Repository): GeneratedPreview {
    return {
      filename: "README-DRAFT.md",
      language: "markdown",
      description: "Borrador independiente; NO sustituye README existente ni presupone que tiene una web viva.",
      content: [
        "# " + repo.name.replace(/[\r\n#]/g, " ").slice(0, 100),
        "",
        repo.description || "Descripción del propósito pendiente de verificar.",
        "",
        "## Objetivo y usuarios",
        "Por documentar con el propietario del proyecto.",
        "",
        "## Estado de publicación",
        "No verificado desde esta herramienta. La URL homepage del perfil GitHub no prueba uptime.",
        "",
        "## Código",
        repo.githubUrl,
        "",
        "## Derechos y licencia",
        "Consultar LICENSE del repositorio. No inferir derechos por el uso de una plantilla.",
      ].join(NL) + NL,
    };
  }

  static generatePythonDoctorScript(name: string): GeneratedPreview {
    return {
      filename: "scripts/doctor_readonly.py",
      language: "python",
      description: "Script de lectura local sin eliminación de archivos, red, credenciales o procesos.",
      content: [
        '"""Read-only repository entrypoint inspection."""',
        "from pathlib import Path",
        "import json",
        "",
        "def main():",
        '    files = ["README.md", "LICENSE", "index.html", "package.json", "pyproject.toml"]',
        "    present = {file: Path(file).is_file() for file in files}",
        '    print(json.dumps({"repository": ' + JSON.stringify(name.slice(0, 80)) + ', "files_present": present}, indent=2))',
        "",
        'if __name__ == "__main__":',
        "    main()",
        "",
      ].join(NL),
    };
  }

  static generateGhCliCommands(repo: Repository): string {
    const match = repo.githubUrl.match(/^https:\/\/github\.com\/([A-Za-z0-9-]{1,39})\/([A-Za-z0-9._-]{1,100})\/?$/);
    const target = match ? match[1] + "/" + match[2] : "OWNER/REPO";
    return [
      "# SOLO LECTURA - ejecutar manualmente en terminal autorizado",
      "# Si ves OWNER/REPO sustituye por un nombre real antes de ejecutar.",
      "gh repo view " + target + " --json nameWithOwner,defaultBranchRef,description,isArchived",
      "gh run list --repo " + target + " --limit 10",
      "# Este navegador no puede aplicar cambios en GitHub.",
      "",
    ].join(NL);
  }
}
