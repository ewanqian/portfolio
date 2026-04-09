export default {
  "nodes": [
    {
      "id": "drop-flow",
      "label": "Drop Flow",
      "type": "work"
    },
    {
      "id": "kashiwa",
      "label": "《机械光合：TITAN 的全息声林》",
      "type": "work"
    },
    {
      "id": "timer",
      "label": "TIMER 控时者",
      "type": "work"
    },
    {
      "id": "can-festival",
      "label": "CAN Festival",
      "type": "node"
    },
    {
      "id": "drop-flow-hangzhou-biennale",
      "label": "Drop Flow / 杭州双年展开幕节点",
      "type": "node"
    },
    {
      "id": "observation-and-symbiosis",
      "label": "Observation and Symbiosis / 观察与共生",
      "type": "node"
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
      "target": "drop-flow-hangzhou-biennale"
    },
    {
      "source": "kashiwa",
      "target": "can-festival"
    },
    {
      "source": "can-festival",
      "target": "kashiwa"
    },
    {
      "source": "drop-flow-hangzhou-biennale",
      "target": "drop-flow"
    },
    {
      "source": "ufo-terminal",
      "target": "drop-flow"
    }
  ]
};