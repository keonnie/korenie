# Dependencies

Outline the decision to use a certains dependencies.

# Vite & Vitest

Vite uses native browser ES imports to enable support for modern browsers without a build process. It helps us develop faster and allows us to use native HTML, CSS, and JavaScript with esm, which makes great tools for our entire stack.

# Vitest Coverage Istanbul

Istanbul has been chosen over the default C8 with vitest as C8 was reporting false positives or missing some of the coverage. Istanbul is mature and has provided the insight required to reach maximum coverage.

# eslint & prettier & its plugins

Code quality and uniformity are important to us. The code base need to be consitent for easing the maintenance and keeping the code uniform with compliance with community standard rules as well as our own rules.

# happy-dom

It's mainly used for headless browser testing, and it's light without the requirement to install a headless browser in the development container.

# Inflected

We wanted to keep implementation dynamic as much as possible and reduce complication with settings (such as registering controls). As an example, the package is useful for transforming a class name into a control name. It has also been used in other contexts, such as pluralization or singularization.

# postcss-nesting

CSS nesting is still in draft and experimental stages. But we wanted to keep native CSS without the need for extra compilation. We use it mostly as a polyfill.

# urlpattern-polyfill

URLPattern is not yet fully supported by all browsers, and we wanted to ensure that we could use our application routing strategy on every browser without reimplementing it.
