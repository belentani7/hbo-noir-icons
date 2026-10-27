# BELENTANI — Noir Icons / Corporate Visual Repository Atlas

**Archivo cinematográfico y estudio de iconos para proyectos de BELENTANI.** Estética negro profundo con luz líquida violeta, tarjetas de cristal, cascada 3D y modos visuales inspirados en interfaces audiovisuales. Se mantiene íntegro el producto React/Vite original y las pantallas experimentales sin crear un proyecto nuevo.

## Producto actual verificable

La aplicación contiene:
- Vistas `Cascade3DStream`, `SmartWatchCascadeTV`, `NetflixGrandScreen`, `ZeroTextScreen` y sus modos de iluminación.
- Un estudio de iconos procedurales, galería y controles de efectos de sonido.
- Consola gráfica interactiva con comandos de navegación internos.
- Doctor Fix, que **genera ejemplos de correcciones y archivos**; el navegador no ejecuta comandos reales de GitHub, no tiene tokens ni escribe cambios en repositorios.
- Sincronización opcional desde la **API pública** de GitHub para `belentani7`. Solo puede ver repositorios públicos. Si no hay públicos visibles o hay error de red/rate limit, muestra el **catálogo editorial local** conservado con su procedencia señalada. No inventa acceso a proyectos privados.
- Estadísticas de la consola basadas en el estado de sincronización disponible (número público declarado, fichas, homepages declaradas y último momento de respuesta correcta); se han eliminado porcentajes de uptime, FPS, checks SHA y contadores de autosincronización fabricados.

La etiqueta **homepage declarada** no equivale a una web desplegada y operativa. El contador de repositorios que informa GitHub públicamente puede incluir más proyectos que los de la primera página de resultados del cliente. No extrapolar el catálogo local a 500 repositorios privados.

## Estado de comandos visuales — octubre 2026

La consola `shield`, `verify`, `manifest` y `fix` es una experiencia guiada **sin acceso al árbol de archivos ni ejecución de comandos del sistema**. Ahora muestra acciones pendientes y referencias, nunca certificaciones FIPS, hallazgos SAST, SHA-256 verificados o correcciones efectivamente aplicadas. Para obtener resultados reales hay que ejecutar los scripts desde un entorno autorizado y comprobar el informe generado. Ningún archivo original de los modos audiovisuales se ha eliminado.

## Ejecutar

    npm ci --no-audit --no-fund
    npm run dev

El servidor Vite de desarrollo abre en el puerto indicado (normalmente 3000). Para verificar la entrega antes de publicarla:

    npm run test
    npm run lint
    npm run build

La CI ejecuta el contrato de procedencia, pruebas de no falsificación de telemetría, validación de TypeScript y compilación real de Vite. Se requiere confirmación de ejecución del runner, no solo el estado de un workflow en cola o fallido sin pasos.

## Limitaciones y privacidad

- No se autentica contra GitHub desde esta web, ni se solicita introducir PATs en una aplicación cliente.
- Las fichas editoriales no implican que sus URLs sean publicables, actuales o que las webs estén operativas.
- El terminal es una experiencia UI, **no un Linux real**, y no ofrece acceso al sistema de archivos ni ejecuta tareas de servidor.
- La etiqueta de Doctor Fix describe un generador de código orientativo, que debe revisarse y ejecutarse manualmente en un entorno autorizado.
- Los datos públicos de GitHub provienen de consultas de navegador. No se sincronizan ni se exponen repositorios privados de la cuenta.
- La página no necesita `GEMINI_API_KEY` para el catálogo y el estudio de iconos; `.env.example` es un resto de su origen en AI Studio, no prueba de integración activa. **No incluyas claves reales en variables de cliente Vite.**

## Arquitectura principal

    src/App.tsx                    compositor de vistas y navegación
    src/components/                TV, cascada, iconos, Terminal y Doctor Fix
    src/services/githubSync.ts     lectura pública de GitHub, estado verificado, fallback
    src/services/doctorFix.ts      generador local de ejemplos de parches, sin escrituras
    src/data/repositories.ts       catálogo editorial conservado
    tests/catalog-contract.test.mjs  cobertura de procedencia y claims
    .github/workflows/ci.yml       gates de calidad
    docs/ORIGEN-AI-STUDIO.md        README inicial conservado

**Estado de la rama:** candidato a validación; no se considera publicado hasta comprobar pruebas, navegación real de modos y el host. Ninguna otra aplicación de BELENTANI se ha fusionado o eliminado.
