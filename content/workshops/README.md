# Workshops content source

Workshop series are maintained here as public content objects, parallel to `content/works/`.

Each series keeps a stable `slug` and may gradually accumulate:

- `editions`: date, place, host, documentation, participant outcomes;
- `resources`: collection tasks, templates, starter kits, examples, FAQ;
- participant and host pathways when public application flows are ready.

Frontend data is generated with:

```bash
node scripts/build-workshops.js
```

The generated file is `react/src/data/generated/workshops.js`. Do not maintain the generated file as the primary information source.
