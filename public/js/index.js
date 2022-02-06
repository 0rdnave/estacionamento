"use strict";
const precoVaga = 7.0;
const AdicionarCarro = (nome, veiculo, placa) => {
    const itens = {
        nome: nome,
        veiculo: veiculo,
        placa: placa,
        entrada: Date.now(),
    };
    let store = window.localStorage.getItem("cadastro");
    if (localStorage.getItem("cadastro") === null) {
        localStorage.setItem("cadastro", JSON.stringify([itens]));
    }
    else {
        store &&
            localStorage.setItem("cadastro", JSON.stringify([...JSON.parse(store), itens]));
    }
    getStore();
};
const getStore = () => {
    let store = window.localStorage.getItem("cadastro");
    const tabela = document.getElementById("tab_body");
    if (tabela)
        tabela.innerHTML = "";
    if (store) {
        const data = JSON.parse(store);
        data.forEach((element) => {
            const tabRow = document.createElement("tr");
            tabela === null || tabela === void 0 ? void 0 : tabela.appendChild(tabRow);
            tabRow.setAttribute("id", "tab_row");
            for (const key in element) {
                const tabCel = document.createElement("td");
                let item = element[key].toString();
                if (key == "entrada") {
                    const data = new Date(parseInt(item));
                    item = new Intl.DateTimeFormat("pt-BR", {
                        year: "2-digit",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                    }).format(data);
                }
                tabCel.textContent = item;
                tabRow === null || tabRow === void 0 ? void 0 : tabRow.appendChild(tabCel);
            }
        });
    }
};
const entrada = () => {
    const nome = document.getElementById("id_cliente").value;
    const veiculo = document.getElementById("id_veiculo")
        .value;
    const placa = document.getElementById("id_placa").value;
    if (nome && veiculo && placa) {
        AdicionarCarro(nome, veiculo, placa);
        return;
    }
    alert("Preencha todos os campos");
};
const saida = () => {
    const placa = document.getElementById("id_placa").value;
    if (!placa) {
        return alert("Preencha a placa");
    }
    const store = window.localStorage.getItem("cadastro");
    if (store) {
        const data = JSON.parse(store);
        for (const key in data) {
            if (data[key].placa == placa) {
                const newItem = Object.assign(Object.assign({}, data[key]), { saida: Date.now() });
                const valor = calcularValor(newItem.entrada, newItem.saida, precoVaga);
                const newData = data.filter((item) => item !== data[key]);
                window.localStorage.setItem("cadastro", JSON.stringify(newData));
                alert(`Preço a pagar: R$${valor.toFixed(2)}`);
            }
        }
    }
    getStore();
};
const calcularValor = (e, s, preco) => {
    const entrada = new Date(e);
    const saida = new Date(s);
    let tempo = (saida.getHours() * 60 +
        saida.getMinutes() -
        entrada.getHours() * 60 -
        entrada.getMinutes()) /
        60;
    const tempoArredondado = Math.round(tempo);
    tempo =
        tempoArredondado >= tempo && tempoArredondado == 0
            ? tempoArredondado
            : tempoArredondado + 1;
    const valor = tempo * preco;
    return valor;
};
