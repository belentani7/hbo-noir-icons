# Contribuir

## Flujo

1. Abre un issue describiendo el problema o la propuesta.
2. Crea una rama corta: `feat/...`, `fix/...` o `docs/...`.
3. Aplica el protocolo spec-first y añade tests.
4. Ejecuta la verificación local.
5. Abre un PR completando la checklist de `.github/pull_request_template.md`.

## Comandos

- `dev`: `vite --port=3000 --host=0.0.0.0`
- `build`: `vite build`
- `preview`: `vite preview`
- `clean`: `node -e "require('node:fs').rmSync('dist',{recursive:true,force:true})"`
- `lint`: `tsc --noEmit`
- `test`: `node --test tests/catalog-contract.test.mjs`
- `verify`: `npm run test && npm run lint && npm run build`

## Reglas

- Conventional commits.
- Sin secretos ni credenciales.
- Un cambio reversible por PR.
- Revisión de `@belentani7` y CI verde.
