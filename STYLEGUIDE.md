# Guía de estilo web

Versión inicial — 2026-09-19

## Dirección

La web debe sentirse como una publicación técnica personal extremadamente cuidada: sobria, precisa, editorial y vinculada al software, sin parecer un portfolio de desarrollador.

La referencia principal es el lenguaje visual de [Commit Mono](https://commitmono.com/): tipografía monoespaciada como elemento central, composición limpia, jerarquía tipográfica fuerte, espacio negativo abundante, interfaces planas y detalles funcionales inspirados en documentación técnica, herramientas de ingeniería y editores de texto.

La estética debe transmitir rigor, claridad y criterio. Debe parecer una combinación de publicación técnica independiente, documentación de ingeniería, herramienta profesional, editor de texto minimalista y pequeño laboratorio personal de software.

No debe parecer una landing page de startup, un portfolio típico, una plantilla SaaS, una web cyberpunk, una terminal falsa ni una interfaz retro caricaturizada.

Cada elemento visible necesita una razón funcional o compositiva para existir.

## Tipografía

- La tipografía monoespaciada es la tipografía de toda la web: interfaz, navegación, cuerpo, títulos y metadatos.
- La opción principal es Commit Mono.
- Las ligaduras deben estar activadas, especialmente en código y elementos técnicos.
- La jerarquía se construye con tamaño, peso, espaciado, alineación, posición y contraste; no cambiando continuamente de familia tipográfica.
- La lectura debe ser cómoda y aireada. Evitar tamaños demasiado pequeños.
- El cuerpo de los artículos debe mantener una línea relativamente estrecha, aproximadamente 65–75 caracteres.
- Los títulos deben ser contenidos; no deben parecer titulares de marketing.

## Layout

- Preferir una columna principal o dos columnas muy discretas cuando exista contenido auxiliar.
- Usar alineaciones estrictas, grids sencillos, márgenes amplios y separadores finos.
- Mantener el contenido limitado en ancho y conservar espacio negativo en pantallas grandes.
- Organizar los elementos como si pertenecieran a un documento, fichero o herramienta técnica.
- Los separadores horizontales de 1px pueden organizar contenido.
- Los bordes deben ser discretos.
- El `border-radius` debe ser mínimo o inexistente, salvo que tenga una función clara.

Evitar tarjetas, contenedores redondeados, sombras grandes, elevaciones, glassmorphism, superficies flotantes, glow y blur decorativo.

## Color

La paleta debe ser mínima y funcionar en monocromo:

- un color de fondo;
- un color principal de texto;
- uno o dos tonos secundarios;
- un único color de acento.

El acento se reserva para enlaces activos, estados seleccionados, elementos interactivos y pequeñas referencias visuales. No debe utilizarse como decoración distribuida por la interfaz.

No usar gradientes como elemento principal ni colores saturados sin función.

El modo oscuro, si se añade, debe ser una reinterpretación equivalente del sistema visual, no una simple inversión de colores.

## Navegación

La navegación debe ser textual, mínima e integrada en el documento. Por ejemplo:

```text
writing    projects    about
```

No debe depender de iconos. Los símbolos Unicode simples pueden utilizarse cuando sean más claros que un icono: `→`, `↗`, `←`, `+`, `×`, `/`, `#`, `[ ]`, `>`.

La navegación por teclado puede complementar la navegación convencional:

| Tecla | Acción |
| --- | --- |
| `j` | siguiente elemento |
| `k` | elemento anterior |
| `Enter` | abrir |
| `/` | buscar |
| `Esc` | cerrar o volver |

Los atajos nunca deben ser necesarios. Toda interacción de teclado debe tener equivalente mediante ratón o touch.

## Interacción

La interacción debe ser rápida, silenciosa y precisa.

Los estados hover pueden expresar cambio de color, subrayado, inversión de fondo y texto, desplazamientos mínimos, símbolos simples o cambio de peso. Las transiciones deben durar aproximadamente 100–200 ms.

No usar animaciones llamativas, entradas masivas, parallax, efectos 3D ni cursores personalizados. Una animación solo existe si comunica estado, navegación o relación entre elementos.

## Home

La home funciona como presentación personal, índice y entrada al contenido. No debe empezar con un hero convencional ni con una propuesta de valor de marketing.

La introducción debe ser concisa. Conceptualmente:

```text
YOUR NAME

Software Engineer

writing / projects / about
```

Después debe aparecer trabajo real, en este orden de prioridad:

1. artículos;
2. proyectos;
3. áreas de interés;
4. información personal secundaria.

El visitante debe entender quién soy observando lo que escribo y construyo, no leyendo una descripción extensa.

## Writing

La sección de artículos debe sentirse como una publicación técnica, no como un blog de tarjetas.

Preferir listas editoriales compactas:

```text
2026-09-19   Logic in Types
             Making invalid states unrepresentable

2026-08-02   Context Is an Engineering Problem
             Designing tools for humans and agents
```

La fecha, categoría, lenguaje y tiempo de lectura pueden funcionar como metadatos. La prioridad visual siempre es el título.

La lectura debe ser cómoda, lineal y sin distracciones.

## Artículos

La estructura editorial puede incluir, cuando aporte valor:

- título;
- subtítulo;
- fecha;
- tiempo de lectura;
- tags;
- tabla de contenidos mínima;
- cuerpo;
- código;
- diagramas;
- notas;
- enlaces relacionados.

Los bloques de código deben integrarse en la página como contenido técnico, no parecer widgets independientes. El resaltado debe ser reducido y coherente con la paleta: principalmente texto neutro con pequeños acentos semánticos, no diez colores diferentes.

Las experiencias interactivas solo se añaden cuando explican mejor un concepto. Deben parecer herramientas de aprendizaje, no demos visuales. Por ejemplo, un artículo sobre modelado mediante tipos podría mostrar:

```text
boolean flags
↓
enum
↓
sealed hierarchy
```

## Projects

Los proyectos deben parecer un índice técnico, no tarjetas genéricas con logo, screenshot y botón:

```text
Context Workbench                          Rust

Developer context infrastructure for humans and agents.

CLI · SQLite · workspace management · context orchestration
```

Cada proyecto puede tener después una página propia con problema, contexto, decisiones de diseño, arquitectura, trade-offs, implementación, resultados y estado actual.

Debe mostrarse pensamiento de ingeniería, no únicamente el resultado visual.

## About

La página About debe ser corta y no convertirse en un CV web.

Debe explicar principalmente:

- qué problemas me interesa resolver;
- cómo pienso sobre software;
- en qué áreas trabajo;
- tecnologías relevantes;
- enlaces profesionales.

La experiencia laboral detallada puede existir, pero no debe dominar la página.

## Terminal aesthetic

La web puede sugerir visualmente terminales, código y herramientas técnicas, pero nunca debe simular literalmente una terminal.

No usar clichés como `whoami`, `sudo`, `root@yourname`, `$ cd about` o `$ ls projects`. La inspiración debe venir del lenguaje visual de las herramientas técnicas, no de fingir comandos.

## Detalles distintivos

La personalidad aparece en pequeños detalles que se descubren progresivamente:

- navegación mediante teclado;
- estados de selección discretos;
- ligaduras tipográficas;
- índice interactivo;
- componentes técnicos dentro de artículos;
- código ejecutable cuando tenga sentido;
- referencias cruzadas entre artículos y proyectos;
- shortcuts discretos;
- indicadores de estado pequeños.

A primera vista la web debe parecer extremadamente sencilla. La sofisticación debe estar en la precisión, no en la cantidad de efectos.

## Principio rector

La web debe parecer diseñada por un ingeniero que entiende diseño, no por un ingeniero intentando demostrar que sabe CSS.

Ante cualquier decisión visual, elegir la opción más simple que conserve intención y personalidad. Si un elemento puede eliminarse sin perder información, probablemente debe eliminarse.

El resultado debe sentirse como una herramienta, una publicación y un espacio personal al mismo tiempo.
