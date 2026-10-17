// GENERADO por sync_piezas.js a partir de Ductflow public/pieces.js — no editar a mano.
// formula(v, ut, variant) = m² de UNA pieza, idéntica a la de Ductflow (variant "radius",
// ut = desarrollo de la unión en mm). El cliente no ve m²: es para cálculos internos.
window.AERIS_PIEZAS = [
  {
    "id": "conducto-recto",
    "name": "Conducto recto",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/conducto-recto.webp?v=34ffd6ee",
      "sketch": "piezas/3d/conducto-recto-sketch.webp?v=557b4e17",
      "overlay": [
        {
          "key": "L",
          "left": "57.8%",
          "top": "4.8%"
        },
        {
          "key": "B",
          "left": "41.2%",
          "top": "22.9%"
        },
        {
          "key": "A",
          "left": "41.2%",
          "top": "70.3%"
        }
      ]
    },
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "codo",
    "name": "Codo",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "R1",
        "hint": "Radio interior",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo",
        "angle": true
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/codo.webp?v=1cea3522",
      "sketch": "piezas/3d/codo-sketch.webp?v=2262e28a",
      "overlay": [
        {
          "key": "A",
          "left": "58.4%",
          "top": "95.4%"
        },
        {
          "key": "R1",
          "left": "48.5%",
          "top": "88.0%"
        },
        {
          "key": "G",
          "left": "63.0%",
          "top": "56.8%"
        },
        {
          "key": "B",
          "left": "68.7%",
          "top": "21.5%"
        }
      ]
    },
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            return (((v.A + v.R1) * Math.PI / 180 * v.G) + ut) * ((v.A + v.B) * 2) / 1_000_000;
        }
        return (2 * (v.A + v.B)) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "codo-recto",
    "name": "Codo recto",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "C",
        "hint": "Lado 1 esquina",
        "angle": false
      },
      {
        "key": "D",
        "hint": "Lado 2 esquina",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/codo-recto.webp?v=8be84670",
      "sketch": "piezas/3d/codo-recto-sketch.webp?v=a7cfaaca",
      "overlay": [
        {
          "key": "C",
          "left": "59.8%",
          "top": "3.8%"
        },
        {
          "key": "D",
          "left": "49.3%",
          "top": "27.3%"
        },
        {
          "key": "A",
          "left": "70.3%",
          "top": "21.4%"
        },
        {
          "key": "B",
          "left": "81.4%",
          "top": "3.8%"
        }
      ]
    },
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.C + v.D + ut) / 1_000_000;
    }
  },
  {
    "id": "codo-reduccion",
    "name": "Codo Reducción",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho (boca grande)",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto (boca grande)",
        "angle": false
      },
      {
        "key": "R1",
        "hint": "Radio interior",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo",
        "angle": true
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/codo-reduccion.webp?v=89c58a40",
      "sketch": "piezas/3d/codo-reduccion-sketch.webp?v=8fb38e0d",
      "overlay": [
        {
          "key": "A",
          "left": "61.1%",
          "top": "52.2%"
        },
        {
          "key": "R1",
          "left": "51.2%",
          "top": "42.0%"
        },
        {
          "key": "G",
          "left": "56.0%",
          "top": "35.8%"
        },
        {
          "key": "B",
          "left": "82.2%",
          "top": "52.2%"
        }
      ]
    },
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            return (((v.A + v.R1) * Math.PI / 180 * v.G) + ut) * ((v.A + v.B) * 2) / 1_000_000;
        }
        return (2 * (v.A + v.B)) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "reduccion",
    "name": "Reducción",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho (boca grande)",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto (boca grande)",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/reduccion.webp?v=f1975d08",
      "sketch": "piezas/3d/reduccion-sketch.webp?v=a1db6484",
      "overlay": [
        {
          "key": "L",
          "left": "57.8%",
          "top": "3.9%"
        },
        {
          "key": "B",
          "left": "46.9%",
          "top": "23.1%"
        },
        {
          "key": "A",
          "left": "47.0%",
          "top": "70.9%"
        }
      ]
    },
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "zapato",
    "name": "Zapato",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "r",
        "hint": "Radio",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/zapato.webp?v=a0433ed9",
      "sketch": "piezas/3d/zapato-sketch.webp?v=5a245c0e",
      "overlay": [
        {
          "key": "A",
          "left": "54.2%",
          "top": "5.6%"
        },
        {
          "key": "L",
          "left": "41.8%",
          "top": "23.1%"
        },
        {
          "key": "B",
          "left": "87.4%",
          "top": "5.6%"
        },
        {
          "key": "r",
          "left": "67.6%",
          "top": "18.7%"
        }
      ]
    },
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            return ((v.A + v.r + v.B) * 2) * (v.L + ut) / 1_000_000;
        }
        return ((v.A + v.B) * 2) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "cuello",
    "name": "Cuello",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/cuello.webp?v=591158dc",
      "sketch": "piezas/3d/cuello-sketch.webp?v=d316bafe",
      "overlay": [
        {
          "key": "L",
          "left": "57.7%",
          "top": "40.7%"
        },
        {
          "key": "B",
          "left": "65.5%",
          "top": "22.8%"
        },
        {
          "key": "A",
          "left": "65.5%",
          "top": "70.6%"
        }
      ]
    },
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "cuello-telescopico",
    "name": "Cuello telescópico",
    "inputs": [
      {
        "key": "A1",
        "hint": "Ancho tramo 1",
        "angle": false
      },
      {
        "key": "B1",
        "hint": "Alto tramo 1",
        "angle": false
      },
      {
        "key": "L1",
        "hint": "Longitud tramo 1",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho tramo 2",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto tramo 2",
        "angle": false
      },
      {
        "key": "L2",
        "hint": "Longitud tramo 2",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/cuello-telescopico.webp?v=b598b793",
      "sketch": "piezas/3d/cuello-telescopico-sketch.webp?v=7c3d0b74",
      "overlay": [
        {
          "key": "L1",
          "left": "55.1%",
          "top": "40.7%"
        },
        {
          "key": "L2",
          "left": "59.6%",
          "top": "4.8%"
        },
        {
          "key": "B1",
          "left": "47.2%",
          "top": "22.8%"
        },
        {
          "key": "B2",
          "left": "68.2%",
          "top": "22.8%"
        },
        {
          "key": "A1",
          "left": "47.2%",
          "top": "70.6%"
        },
        {
          "key": "A2",
          "left": "68.2%",
          "top": "70.6%"
        }
      ]
    },
    "formula": function (v, ut) {
        var s1 = ((v.A1 + v.B1) * 2) * (v.L1 + ut) / 1_000_000;
        var s2 = ((v.A2 + v.B2) * 2) * (v.L2 + ut) / 1_000_000;
        return s1 + s2;
    }
  },
  {
    "id": "vierteaguas",
    "name": "Vierteaguas",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      }
    ],
    "noUT": true,
    "formula": function (v) {
        return (v.A + v.B) * 3 / 1_000;
    }
  },
  {
    "id": "desvio",
    "name": "Desvío",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      },
      {
        "key": "D",
        "hint": "Desvío (offset)",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/desvio.webp?v=81248e62",
      "sketch": "piezas/3d/desvio-sketch.webp?v=1d06af1c",
      "overlay": [
        {
          "key": "L",
          "left": "56.5%",
          "top": "93.5%"
        },
        {
          "key": "A",
          "left": "41.2%",
          "top": "72.6%"
        },
        {
          "key": "D",
          "left": "71.8%",
          "top": "56.9%"
        },
        {
          "key": "B",
          "left": "41.2%",
          "top": "20.2%"
        }
      ]
    },
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.L + ut + v.D / 2) / 1_000_000;
    }
  },
  {
    "id": "tapa",
    "name": "Tapa",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      }
    ],
    "noUT": true,
    "formula": function (v) {
        return (v.A + v.B) * 0.8 / 1_000;
    }
  },
  {
    "id": "deflector",
    "name": "Deflector",
    "inputs": [
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Ancho desarrollado lama",
        "angle": false
      }
    ],
    "noUT": true,
    "formula": function (v) {
        return v.B * v.L / 1_000_000;
    }
  },
  {
    "id": "pantalon",
    "name": "Pantalón",
    "inputs": [
      {
        "key": "A1",
        "hint": "Ancho bifurcación 1",
        "angle": false
      },
      {
        "key": "D",
        "hint": "Separación entre bifurcaciones",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho bifurcación 2",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/pantalon.webp?v=cd3426b7",
      "sketch": "piezas/3d/pantalon-sketch.webp?v=020507b7",
      "overlay": [
        {
          "key": "A1",
          "left": "66.6%",
          "top": "77.4%"
        },
        {
          "key": "D",
          "left": "66.6%",
          "top": "65.6%"
        },
        {
          "key": "A2",
          "left": "66.6%",
          "top": "53.9%"
        },
        {
          "key": "L",
          "left": "55.4%",
          "top": "94.8%"
        },
        {
          "key": "B",
          "left": "44.2%",
          "top": "17.8%"
        }
      ]
    },
    "formula": function (v, ut) {
        return ((v.A1 + v.D + v.A2 + v.B) * 2) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "bifurcacion",
    "name": "Bifurcación",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho tronco",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto tronco",
        "angle": false
      },
      {
        "key": "L1",
        "hint": "Longitud tronco",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho ramal",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto ramal",
        "angle": false
      },
      {
        "key": "R",
        "hint": "Radio ramal",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo ramal",
        "angle": true
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/bifurcacion.webp?v=1f8d76e5",
      "sketch": "piezas/3d/bifurcacion-sketch.webp?v=811e23ff",
      "overlay": [
        {
          "key": "A",
          "left": "69.1%",
          "top": "74.5%"
        },
        {
          "key": "L1",
          "left": "55.6%",
          "top": "94.4%"
        },
        {
          "key": "A2",
          "left": "55.8%",
          "top": "36.7%"
        },
        {
          "key": "R",
          "left": "45.2%",
          "top": "46.2%"
        },
        {
          "key": "G",
          "left": "50.1%",
          "top": "55.2%"
        },
        {
          "key": "B",
          "left": "42.0%",
          "top": "18.2%"
        },
        {
          "key": "B2",
          "left": "98.0%",
          "top": "18.2%"
        }
      ]
    },
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            var trunk = ((v.A + v.B) * 2) * (v.L1 + ut) / 1_000_000;
            var branch = (((v.A2 + v.R) * Math.PI / 180 * v.G) + ut) * ((v.A2 + v.B2) * 2) / 1_000_000;
            return trunk + branch;
        }
        var trunk = (2 * (v.A1 + v.B1)) * (v.L1 + ut) / 1_000_000;
        var branch = (2 * (v.A2 + v.B2)) * (v.L2 + ut) / 1_000_000;
        return trunk + branch;
    }
  },
  {
    "id": "mariposa",
    "name": "Mariposa (bifurcación doble)",
    "inputs": [
      {
        "key": "A1",
        "hint": "Ancho ramal 1",
        "angle": false
      },
      {
        "key": "B1",
        "hint": "Alto ramal 1",
        "angle": false
      },
      {
        "key": "R1",
        "hint": "Radio ramal 1",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho ramal 2",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto ramal 2",
        "angle": false
      },
      {
        "key": "R2",
        "hint": "Radio ramal 2",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo común",
        "angle": true
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/mariposa.webp?v=9c401ff5",
      "sketch": "piezas/3d/mariposa-sketch.webp?v=213f8c48",
      "overlay": [
        {
          "key": "A1",
          "left": "46.4%",
          "top": "34.3%"
        },
        {
          "key": "A2",
          "left": "74.1%",
          "top": "34.3%"
        },
        {
          "key": "R1",
          "left": "50.4%",
          "top": "14.0%"
        },
        {
          "key": "R2",
          "left": "70.1%",
          "top": "14.0%"
        },
        {
          "key": "B2",
          "left": "84.6%",
          "top": "52.6%"
        },
        {
          "key": "B1",
          "left": "46.4%",
          "top": "76.1%"
        }
      ]
    },
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            var s1 = (((v.A1 + v.R1) * Math.PI / 180 * v.G) + ut) * ((v.A1 + v.B1) * 2) / 1_000_000;
            var s2 = (((v.A2 + v.R2) * Math.PI / 180 * v.G) + ut) * ((v.A2 + v.B2) * 2) / 1_000_000;
            return s1 + s2;
        }
        var s1 = (2 * (v.A1 + v.B1)) * (v.L1 + ut) / 1_000_000;
        var s2 = (2 * (v.A2 + v.B2)) * (v.L2 + ut) / 1_000_000;
        return s1 + s2;
    }
  },
  {
    "id": "bifurcacion-triple",
    "name": "Bifurcación triple",
    "inputs": [
      {
        "key": "A1",
        "hint": "Ancho tronco",
        "angle": false
      },
      {
        "key": "B1",
        "hint": "Alto tronco",
        "angle": false
      },
      {
        "key": "L1",
        "hint": "Longitud tronco",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho ramal 2",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto ramal 2",
        "angle": false
      },
      {
        "key": "R2",
        "hint": "Radio ramal 2",
        "angle": false
      },
      {
        "key": "A3",
        "hint": "Ancho ramal 3",
        "angle": false
      },
      {
        "key": "B3",
        "hint": "Alto ramal 3",
        "angle": false
      },
      {
        "key": "R3",
        "hint": "Radio ramal 3",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo común",
        "angle": true
      }
    ],
    "img3d": {
      "thumb": "piezas/3d/bifurcacion-triple.webp?v=8fc3fbe7",
      "sketch": "piezas/3d/bifurcacion-triple-sketch.webp?v=154306f5",
      "overlay": [
        {
          "key": "A1",
          "left": "56.4%",
          "top": "37.1%"
        },
        {
          "key": "A2",
          "left": "41.2%",
          "top": "65.9%"
        },
        {
          "key": "A3",
          "left": "71.6%",
          "top": "65.9%"
        },
        {
          "key": "R2",
          "left": "45.5%",
          "top": "85.6%"
        },
        {
          "key": "R3",
          "left": "67.3%",
          "top": "85.6%"
        },
        {
          "key": "G",
          "left": "49.4%",
          "top": "75.4%"
        },
        {
          "key": "L1",
          "left": "54.0%",
          "top": "6.8%"
        },
        {
          "key": "B1",
          "left": "41.2%",
          "top": "19.9%"
        },
        {
          "key": "B2",
          "left": "98.8%",
          "top": "19.9%"
        },
        {
          "key": "B3",
          "left": "68.4%",
          "top": "19.9%"
        }
      ]
    },
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            var trunk = ((v.A1 + v.B1) * 2) * (v.L1 + ut) / 1_000_000;
            var b2 = (((v.A2 + v.R2) * Math.PI / 180 * v.G) + ut) * ((v.A2 + v.B2) * 2) / 1_000_000;
            var b3 = (((v.A3 + v.R3) * Math.PI / 180 * v.G) + ut) * ((v.A3 + v.B3) * 2) / 1_000_000;
            return trunk + b2 + b3;
        }
        var s1 = (2 * (v.A1 + v.B1)) * (v.L1 + ut) / 1_000_000;
        var s2 = (2 * (v.A2 + v.B2)) * (v.L2 + ut) / 1_000_000;
        var s3 = (2 * (v.A3 + v.B3)) * (v.L3 + ut) / 1_000_000;
        return s1 + s2 + s3;
    }
  },
  {
    "id": "reduccion-excentrica",
    "name": "Reducción excéntrica",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho (boca grande)",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto (boca grande)",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      }
    ],
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "te-rectangular",
    "name": "Te rectangular",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho tronco",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto tronco",
        "angle": false
      },
      {
        "key": "L1",
        "hint": "Longitud tronco",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho ramal",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto ramal",
        "angle": false
      },
      {
        "key": "R",
        "hint": "Radio ramal",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo ramal",
        "angle": true
      }
    ],
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            var trunk = ((v.A + v.B) * 2) * (v.L1 + ut) / 1_000_000;
            var branch = (((v.A2 + v.R) * Math.PI / 180 * v.G) + ut) * ((v.A2 + v.B2) * 2) / 1_000_000;
            return trunk + branch;
        }
        var trunk = (2 * (v.A + v.B)) * (v.L1 + ut) / 1_000_000;
        var branch = (2 * (v.A2 + v.B2)) * (v.L2 + ut) / 1_000_000;
        return trunk + branch;
    }
  },
  {
    "id": "te-diagonal",
    "name": "Te diagonal",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho tronco",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto tronco",
        "angle": false
      },
      {
        "key": "L1",
        "hint": "Longitud tronco",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho ramal",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto ramal",
        "angle": false
      },
      {
        "key": "R",
        "hint": "Radio ramal",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo ramal",
        "angle": true
      }
    ],
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            var trunk = ((v.A + v.B) * 2) * (v.L1 + ut) / 1_000_000;
            var branch = (((v.A2 + v.R) * Math.PI / 180 * v.G) + ut) * ((v.A2 + v.B2) * 2) / 1_000_000;
            return trunk + branch;
        }
        var trunk = (2 * (v.A + v.B)) * (v.L1 + ut) / 1_000_000;
        var branch = (2 * (v.A2 + v.B2)) * (v.L2 + ut) / 1_000_000;
        return trunk + branch;
    }
  },
  {
    "id": "offset-asimetric",
    "name": "Offset asimétrico",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "L",
        "hint": "Longitud",
        "angle": false
      },
      {
        "key": "D",
        "hint": "Offset",
        "angle": false
      }
    ],
    "formula": function (v, ut) {
        return ((v.A + v.B) * 2) * (v.L + ut + v.D / 2) / 1_000_000;
    }
  },
  {
    "id": "codo-transicion",
    "name": "Codo con transición",
    "inputs": [
      {
        "key": "A1",
        "hint": "Ancho entrada",
        "angle": false
      },
      {
        "key": "B1",
        "hint": "Alto entrada",
        "angle": false
      },
      {
        "key": "A2",
        "hint": "Ancho salida",
        "angle": false
      },
      {
        "key": "B2",
        "hint": "Alto salida",
        "angle": false
      },
      {
        "key": "R1",
        "hint": "Radio interior",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo",
        "angle": true
      }
    ],
    "formula": function (v, ut, variant) {
        var pAvg = v.A1 + v.B1 + v.A2 + v.B2;
        if (variant === "radius") {
            var arc = (Math.max(v.A1, v.A2) + v.R1) * Math.PI / 180 * v.G;
            return (arc + ut) * pAvg / 1_000_000;
        }
        return pAvg * (v.L + ut) / 1_000_000;
    }
  },
  {
    "id": "codo-s",
    "name": "Codo S (doble)",
    "inputs": [
      {
        "key": "A",
        "hint": "Ancho",
        "angle": false
      },
      {
        "key": "B",
        "hint": "Alto",
        "angle": false
      },
      {
        "key": "R1",
        "hint": "Radio interior",
        "angle": false
      },
      {
        "key": "G",
        "hint": "Ángulo por codo",
        "angle": true
      }
    ],
    "formula": function (v, ut, variant) {
        if (variant === "radius") {
            var arc = 2 * ((v.A + v.R1) * Math.PI / 180 * v.G);
            return (arc + ut) * ((v.A + v.B) * 2) / 1_000_000;
        }
        return (2 * (v.A + v.B)) * (v.L + ut) / 1_000_000;
    }
  }
];
