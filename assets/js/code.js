// : Cada treball és una fulla i cada caracter del treball
// gasta 1.2 de toner negre, 0.2 de groc, 0.4 de magenta i 0.2 de cyan

let black = 1.2;
let yellow = 0.2;
let magenta = 0.4;
let cyan = 0.2;

const refreshDocuments = (idImpresora) => {
  let impresora = document.getElementById(idImpresora);
  let lista = impresora.querySelector("ul.list-group");
  let queuePrinter = JSON.parse(sessionStorage.getItem(idImpresora)) || [];

  lista.innerHTML = "";

  queuePrinter.forEach((newDocument) => {
    let li = document.createElement("li");
    li.innerHTML = newDocument;
    lista.appendChild(li);
  });
};

const getCost = (work, data, black, yellow, magenta, cyan) => {
  let totalLength = work.length;
  let newNegro = data.negro - black * totalLength;
  let newAmarillo = data.amarillo - yellow * totalLength;
  let newMagenta = data.magenta - magenta * totalLength;
  let newCian = data.cian - cyan * totalLength;

  if (newNegro >= 0 && newAmarillo >= 0 && newMagenta >= 0 && newCian >= 0) {
    return {
      negro: newNegro,
      amarillo: newAmarillo,
      magenta: newMagenta,
      cian: newCian,
    };
  } else {
    return false;
  }
};

const getPrinters = async () => {
  let printers = await fetch("/impresoras");
  let data = await printers.json();
  return data;
};

const updateInk = (printerName, data) => {
  let container = document.getElementById(printerName);
  container.querySelector(".negro").innerHTML = data.negro + "%";
  container.querySelector(".amarillo").innerHTML = data.amarillo + "%";
  container.querySelector(".cyan").innerHTML = data.cian + "%";
  container.querySelector(".magenta").innerHTML = data.magenta + "%";
};

const assignImage = (container, data) => {
  container.querySelector("img").src = data.imagen;
};

document.addEventListener("DOMContentLoaded", async () => {
  let printer0 = "printer0";
  let printer1 = "printer1";
  let printer2 = "printer2";

  let firstPrinter = document.getElementById(printer0);
  let secondPrinter = document.getElementById(printer1);
  let thirdPrinter = document.getElementById(printer2);

  let imprimir0 = document.getElementById("imprimir0");
  let imprimir1 = document.getElementById("imprimir1");
  let imprimir2 = document.getElementById("imprimir2");

  let sendButton = document.getElementById("enviar");
  let info = document.getElementById("info");
  let idImpresora = document.getElementById("idImpresora");

  let rellenar0 = document.getElementById("rellenar0");
  let rellenar1 = document.getElementById("rellenar1");
  let rellenar2 = document.getElementById("rellenar2");

  let data = await getPrinters();

  assignImage(firstPrinter, data[0]);
  assignImage(secondPrinter, data[1]);
  assignImage(thirdPrinter, data[2]);

  updateInk(printer0, data[0]);
  updateInk(printer1, data[1]);
  updateInk(printer2, data[2]);

  refreshDocuments(printer0);
  refreshDocuments(printer1);
  refreshDocuments(printer2);

  sendButton.addEventListener("click", () => {
    let printer = "printer" + idImpresora.value;
    let queuePrinter = JSON.parse(sessionStorage.getItem(printer)) || [];
    queuePrinter.push(info.value);

    sessionStorage.setItem(printer, JSON.stringify(queuePrinter));

    refreshDocuments(printer);
  });

  imprimir0.addEventListener("click", async () => {
    let queuePrinter = JSON.parse(sessionStorage.getItem(printer0)) || [];
    let work = queuePrinter.shift();
    let data = await getPrinters();
    let cost = getCost(work, data[0], black, yellow, magenta, cyan);
    if (cost) {
      fetch("/impresoras/" + 1, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cost),
      })
        .then(() => {
          sessionStorage.setItem(printer0, JSON.stringify(queuePrinter));
          refreshDocuments(printer0);
        })
        .then(() => {
          updateInk(printer0, data[0]);
          location.reload();
        });
    } else {
      alert("No hay tinta suficiente");
    }
  });

  imprimir1.addEventListener("click", async () => {
    let queuePrinter = JSON.parse(sessionStorage.getItem(printer1)) || [];
    let work = queuePrinter.shift();
    let data = await getPrinters();
    let cost = getCost(work, data[1], black, yellow, magenta, cyan);

    if (cost) {
      fetch("/impresoras/" + 2, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cost),
      })
        .then(() => {
          sessionStorage.setItem(printer1, JSON.stringify(queuePrinter));
          refreshDocuments(printer1);
        })
        .then(() => {
          updateInk(printer1, data[1]);
          location.reload();
        });
    } else {
      alert("No hay tinta suficiente");
    }
  });

  imprimir2.addEventListener("click", async () => {
    let queuePrinter = JSON.parse(sessionStorage.getItem(printer2)) || [];
    let work = queuePrinter.shift();
    let data = await getPrinters();
    let cost = getCost(work, data[2], black, yellow, magenta, cyan);

    if (cost) {
      fetch("/impresoras/" + 3, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cost),
      })
        .then(() => {
          sessionStorage.setItem(printer2, JSON.stringify(queuePrinter));
          refreshDocuments(printer2);
        })
        .then(() => {
          updateInk(printer2, data[2]);
          location.reload();
        });
    } else {
      alert("No hay tinta suficiente");
    }
  });

  rellenar0.addEventListener("click", () => {
    fetch("/impresoras/" + 1, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        negro: 100,
        amarillo: 100,
        magenta: 100,
        cian: 100,
      }),
    }).then(() => {
      location.reload();
    });
  });

  rellenar1.addEventListener("click", () => {
    fetch("/impresoras/" + 2, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        negro: 100,
        amarillo: 100,
        magenta: 100,
        cian: 100,
      }),
    }).then(() => {
      location.reload();
    });
  });

  rellenar2.addEventListener("click", () => {
    fetch("/impresoras/" + 3, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        negro: 100,
        amarillo: 100,
        magenta: 100,
        cian: 100,
      }),
    }).then(() => {
      location.reload();
    });
  });
});
