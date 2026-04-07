export default {
  "nodes": [
    {
      "id": "drop-flow",
      "label": "Drop Flow",
      "type": "work"
    },
    {
      "id": "ufo-terminal",
      "label": "UFO Terminal / Creation Camp",
      "type": "node"
    }
  ],
  "links": [
    {
      "source": "drop-flow",
      "target": "ufo-terminal"
    },
    {
      "source": "drop-flow",
      "target": "hangzhou-opening"
    },
    {
      "source": "ufo-terminal",
      "target": "drop-flow"
    }
  ]
};